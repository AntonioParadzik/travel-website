import { XCircleIcon } from '@heroicons/react/solid'
import { useAuth } from '../../contexts/AuthContext'

export default function ErrorMessage() {
    const { error, setError } = useAuth()

    return (
        error && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                    style={{
                        borderRadius: '0.375rem',
                        maxWidth: '20rem',
                        width: '100%',
                        backgroundColor: '#FEE2E2',
                        padding: '1rem',
                        marginTop: '1rem'
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexShrink: 0 }}>
                            <XCircleIcon
                                onClick={() => setError('')}
                                style={{
                                    height: '1.25rem',
                                    width: '1.25rem',
                                    color: '#DC2626'
                                }}
                                aria-hidden="true"
                            />
                        </div>
                        <div style={{ marginLeft: '0.75rem' }}>
                            <h3
                                style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#DC2626'
                                }}
                            >
                                Error: {error}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
