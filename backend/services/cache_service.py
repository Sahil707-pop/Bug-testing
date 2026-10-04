class CacheService:
    """
    In-memory cache service.
    Used across multiple workers and requests.
    """

    def __init__(self):
        self._cache = {}

    def set(self, key: str, value):
        self._cache[key] = value

    def get(self, key: str):
        return self._cache.get(key)

    def delete(self, key: str):
        if key in self._cache:
            del self._cache[key]

    def clear(self):
        self._cache.clear()

    def get_or_set(self, key: str, default_value):
        if key not in self._cache:
            self._cache[key] = default_value
        return self._cache[key]
