import threading
from typing import Optional


class CacheService:
    """
    In-memory cache service.
    Thread-safe using RLock. Distinguishes missing keys from None values.
    """

    _MISSING = object()

    def __init__(self):
        self._cache = {}
        self._lock = threading.RLock()

    def set(self, key: str, value: object) -> None:
        if not isinstance(key, str):
            raise TypeError(f"Key must be a str, got {type(key).__name__}")
        with self._lock:
            self._cache[key] = value

    def get(self, key: str) -> Optional[object]:
        if not isinstance(key, str):
            raise TypeError(f"Key must be a str, got {type(key).__name__}")
        with self._lock:
            cached = self._cache.get(key, self._MISSING)
            if cached is self._MISSING:
                return None
            return cached

    def delete(self, key: str) -> None:
        if not isinstance(key, str):
            raise TypeError(f"Key must be a str, got {type(key).__name__}")
        with self._lock:
            if key in self._cache:
                del self._cache[key]

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()

    def get_or_set(self, key: str, default_value: object) -> object:
        if not isinstance(key, str):
            raise TypeError(f"Key must be a str, got {type(key).__name__}")
        with self._lock:
            if key not in self._cache:
                self._cache[key] = default_value
            return self._cache[key]
