import os
import subprocess
from pathlib import Path


def get_valid_commit_hash(*values: str | None) -> str | None:
    invalid_values = {"", "unknown", "latest"}

    for value in values:
        if value is None:
            continue
        normalized = value.strip()
        if normalized.lower() not in invalid_values:
            return normalized

    return None


def resolve_latest_commit_hash() -> str:
    commit_hash_from_env = get_valid_commit_hash(os.getenv("GIT_COMMIT_HASH"))
    if commit_hash_from_env:
        return commit_hash_from_env

    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            cwd=Path(__file__).resolve().parents[2],
            capture_output=True,
            text=True,
            check=True,
        )
        commit_hash = result.stdout.strip()
        if commit_hash:
            return commit_hash
    except (subprocess.SubprocessError, FileNotFoundError):
        pass

    return "unknown"


LATEST_COMMIT_HASH = resolve_latest_commit_hash()


def health_check() -> dict[str, str]:
    return {"status": "ok", "commit_hash": LATEST_COMMIT_HASH}
