import React, { useState, useEffect, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsGrid from './components/NewsGrid';
import NewsDetail from './components/NewsDetail';
import CategoryPage from './components/CategoryPage';

// Error Boundary: catches any render crash and shows a fallback instead of a blank page
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                    <h2 style={{ color: '#dc2626' }}>Something went wrong while rendering.</h2>
                    <p style={{ color: '#6b7280', marginTop: '8px' }}>{this.state.error?.message}</p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{ marginTop: '16px', padding: '8px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// Home page component
function HomePage() {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/news?limit=25');
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
            const json = await response.json();
            if (json.success) {
                setArticles(json.data);
            } else {
                throw new Error(json.message || 'Failed to fetch news');
            }
        } catch (err) {
            console.error('Error fetching news:', err);
            setError(err.message || 'Unable to load the latest news. Please check if the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {error ? (
                    <div className="bg-red-50 text-red-600 p-8 text-center m-8 rounded-xl font-sans border border-red-200">
                        <h3 className="font-bold text-xl mb-2">Connection Error</h3>
                        <p className="mb-4 text-sm">{error}</p>
                        <button
                            onClick={fetchNews}
                            className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <NewsGrid articles={articles} loading={loading} />
                )}
            </main>

            <footer className="bg-themorning-dark text-white py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 font-sans">
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <img src="/logo.png" alt="iVoice Logo" className="h-10 w-auto filter brightness-0 invert" />
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm">
                            Sri Lanka's leading independent news aggregator, delivering breaking news, analysis, and insights.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-300">Sections</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">Business</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Politics</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Sports</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-300">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500 font-sans">
                    &copy; {new Date().getFullYear()} The Morning News. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
    );
}

export default App;
