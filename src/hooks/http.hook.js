import { useState, useCallback } from "react";
import { Component } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        setLoading(true);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data;

        } catch (e) {
            setLoading(false);
            setError(e.message);
            if (e.message.includes('404')) {
                console.log({ results: [], error: 'Character not found' });
            }
            throw e;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {
        loading: loading,
        error: error,
        request: request,
        clearError: clearError
    }
}

export default useHttp;