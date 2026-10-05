import threading


class CacheService:
    """
    In-memory cache service.
    Used across multiple workers and requests.
    """

    def __init__(self):
        self._cache = {}
        self._lock = threading.Lock()

    def set(self, key: str, value: object) -> None:
        with self._lock:
            self._cache[key] = value

    def get(self, key: str) -> object:
        with self._lock:
            return self._cache.get(key)

    def delete(self, key: str) -> None:
        with self._lock:
            if key in self._cache:
                del self._cache[key]

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()

    def get_or_set(self, key: str, default_value: object) -> object:
        with self._lock:
            if key not in self._cache:
                self._cache[key] = default_value
            return self._cache[key]
# [ARE] Auto-applied baseline stabilization patch
