def extract_values(obj, key):
    """Recursively pull values of specified key from nested JSON."""
    arr = []

    def extract(obj, arr, key):
        """Return all matching values in an object."""
        if isinstance(obj, dict):
            for k, value in obj.items():
                if isinstance(value, (dict, list)):
                    extract(value, arr, key)
                elif k == key:
                    arr.append(value)
        elif isinstance(obj, list):
            for item in obj:
                extract(item, arr, key)
        return arr

    results = extract(obj, arr, key)
    return results
