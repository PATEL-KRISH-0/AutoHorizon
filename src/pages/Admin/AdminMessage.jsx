import { useState, useEffect } from 'react';
import Nav from './AdminNav';
import Footer from '../../components/Footer';
import styles from './css/AdminMessage.module.css';
// import { data } from 'react-router-dom';

export default function AdminMessage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(1);
    // Filter and sort state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    // Modal handling for message details and reply
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState("");

    // Fetch messages from the backend with filters
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            const queryParams = new URLSearchParams({
                search: searchQuery,
                status: selectedStatus,
                dateRange: selectedDateRange,
                sort: selectedSort,
                page: currentPage,
                limit,
            }).toString();
            try {
                const response = await fetch(`http://localhost:3000/api/v1/messages?${queryParams}`, {
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to fetch messages');

                const data = await response.json();
                console.log(data);
                setMessages(data.data.documents);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [searchQuery, selectedStatus, selectedDateRange, selectedSort, currentPage, reload]);

    // Handlers for filter form submission and reset
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        // useEffect will run with updated filter values
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSearchQuery('');
        setSelectedStatus('');
        setSelectedDateRange('');
        setSelectedSort('');
        setCurrentPage(1);
    };

    // Modal and reply functions
    function viewMessage(message) {
        setSelectedMessage(message);
    }

    function closeModal() {
        setSelectedMessage(null);
        setReplyContent("");
    }

    function quickReply() {
        if (selectedMessage) {
            setReplyContent(`Hello ${selectedMessage.from},\n\n`);
        }
    }
    async function markAsSpam(message) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/messages/${message._id || message.id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ "status": "Spam" })
                }
            );

            if (!response.ok) {
                throw new Error('Failed to mark as spam');
            }

            alert('Message marked as spam');
            closeModal();
            setReload(prev => prev + 1); // Ensure reload changes dynamically

        } catch (error) {
            console.error('Error marking message as spam:', error);
            alert('Error marking message as spam');
        }
    }

    async function deleteMessage(message) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/messages/${message._id || message.id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }

            alert('Message deleted successfully');
            closeModal();
            setReload(prev => prev + 1); // Ensure reload changes dynamically

        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Error deleting message');
        }
    }



    function insertTemplate(templateType) {
        const templates = {
            "thank-you": "Thank you for your message. We appreciate your interest in our vehicles.",
            "test-drive": "Thank you for your interest in a test drive. We offer appointments Monday-Saturday, 9 AM - 6 PM.",
            "pricing": "Thank you for your pricing inquiry. I’d be happy to provide details on financing options.",
        };
        setReplyContent((prev) => templates[templateType] + "\n\n" + prev);
    }

    async function handleReply(event) {
        event.preventDefault();
        if (!selectedMessage) return;

        try {
            const response = await fetch('http://localhost:3000/api/v1/messages/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    messageId: selectedMessage._id || selectedMessage.id,
                    replyContent,
                }),

            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert('Reply sent successfully');
                closeModal();
            } else {
                alert(data.error || 'Failed to send reply');
            }
        } catch (error) {
            console.error('Error sending reply:', error);
            alert('Server error');
        }
    }

    return (
        <>
            <Nav />
            <main className={styles['admin-main']}>
                {/* Admin Header */}
                <div className={styles['admin-header']}>
                    <h1>Message Management</h1>
                    <p>Manage and respond to customer inquiries</p>
                    <div className={styles['admin-stats']}>
                        <div className={styles['stat-card']}>
                            <div className={`stat-icon pending`.split(" ").map(cls => styles[cls]).join(" ")}>
                                <i className="ri-message-2-line" />
                            </div>
                            <div className={styles['stat-info']}>
                                <h3>Total Messages</h3>
                                <p>{messages.length}</p>
                            </div>
                        </div>
                        <div className={styles['stat-card']}>
                            <div className={`stat-icon active`.split(" ").map(cls => styles[cls]).join(" ")}>
                                <i className="ri-reply-line" />
                            </div>
                            <div className={styles['stat-info']}>
                                <h3>Replied</h3>
                                <p>{messages.filter(msg => msg.status.toLowerCase() === 'replied').length}</p>
                            </div>
                        </div>
                        <div className={styles['stat-card']}>
                            <div className={`stat-icon warning`.split(" ").map(cls => styles[cls]).join(" ")}>
                                <i className="ri-time-line" />
                            </div>
                            <div className={styles['stat-info']}>
                                <h3>Pending</h3>
                                <p>{messages.filter(msg => msg.status.toLowerCase() === 'pending').length}</p>
                            </div>
                        </div>
                        <div className={styles['stat-card']}>
                            <div className={`stat-icon danger`.split(" ").map(cls => styles[cls]).join(" ")}>
                                <i className="ri-spam-2-line" />
                            </div>
                            <div className={styles['stat-info']}>
                                <h3>Spam</h3>
                                <p>{messages.filter(msg => msg.status.toLowerCase() === 'spam').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className={styles['search-section']}>
                    <form className={styles['search-form']} onSubmit={handleSearchSubmit}>
                        <div className={styles['search-group']}>
                            <i className="ri-search-line" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or subject"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={styles['search-group']}>
                            <i className="ri-filter-3-line" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="">Message Status</option>
                                <option value="pending">Pending</option>
                                <option value="replied">Replied</option>
                                <option value="spam">Spam</option>
                            </select>
                        </div>
                        <div className={styles['search-group']}>
                            <i className="ri-calendar-line" />
                            <select
                                value={selectedDateRange}
                                onChange={(e) => setSelectedDateRange(e.target.value)}
                            >
                                <option value="">Date Range</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>
                        <div className={styles['search-group']}>
                            <i className="ri-sort-desc" />
                            <select
                                value={selectedSort}
                                onChange={(e) => setSelectedSort(e.target.value)}
                            >
                                <option value="">Sort By</option>
                                <option value="date">Date</option>
                                <option value="priority">Priority</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                        <div className={styles['search-buttons']}>
                            <button type="submit" className={`btn btn-primary`.split(" ").map(cls => styles[cls]).join(" ")}>
                                <i className="ri-search-line" />
                                Search
                            </button>
                            <button type="reset" className={`btn btn-secondary`.split(" ").map(cls => styles[cls]).join(" ")} onClick={handleReset}>
                                <i className="ri-refresh-line" />
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Messages Table */}
                {loading ? (
                    <p>Loading messages...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className={styles["messages-table-container"]}>
                        <table className={styles["messages-table"]}>
                            <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr key={message._id || message.id}>
                                        <td>
                                            <div className={styles["message-info"]}>
                                                <div className={styles["sender-avatar"]}>
                                                    <i className="ri-user-line" />
                                                </div>
                                                <div className={styles["sender-details"]}>
                                                    <h4>{message.from}</h4>
                                                    <span>{message.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{message.subject}</td>
                                        <td>
                                            <span className={`${styles["status-badge"]} ${styles[message.status.toLowerCase()]}`}>
                                                {message.status}
                                            </span>
                                        </td>
                                        <td>{new Date(message.date).toLocaleString()}</td>
                                        <td>
                                            <div className={styles["action-buttons"]}>
                                                <button className={`${styles["action-btn"]} ${styles["view"]}`} title="View Message" onClick={() => viewMessage(message)}>
                                                    <i className="ri-eye-line" />
                                                </button>
                                                <button className={`${styles["action-btn"]} ${styles["reply"]}`} title="Quick Reply" onClick={quickReply}>
                                                    <i className="ri-reply-line" />
                                                </button>
                                                <button className={`${styles["action-btn"]} ${styles["spam"]}`} title="Mark as Spam" onClick={() => markAsSpam(message)}>
                                                    <i className="ri-spam-2-line" />
                                                </button>
                                                <button className={`${styles["action-btn"]} ${styles["delete"]}`} title="Delete Message" onClick={() => deleteMessage(message)}>
                                                    <i className="ri-delete-bin-line" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                <div className={styles["pagination"]}>
                    <button className={styles["page-btn"]} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        <i className="ri-arrow-left-s-line" />
                    </button>
                    <button className={`${styles["page-btn"]} ${styles["active"]}`}>{currentPage}</button>
                    <button className={styles["page-btn"]} onClick={() => setCurrentPage(currentPage + 1)}>
                        <i className="ri-arrow-right-s-line" />
                    </button>
                </div>
            </main>

            {/* View Message Modal */}
            {selectedMessage && (
                <div className={styles["modal"]}>
                    <div className={styles["modal-content"]}>
                        <div className={styles["modal-header"]}>
                            <h2>Message Details</h2>
                            <button className={styles["close-modal"]} onClick={closeModal}>
                                <i className="ri-close-line" />
                            </button>
                        </div>
                        <div className={styles["message-details"]}>
                            <div className={styles["detail-row"]}>
                                <span className={styles["detail-label"]}>From:</span>
                                <span className={styles["detail-value"]}>{selectedMessage.from}</span>
                            </div>
                            <div className={styles["detail-row"]}>
                                <span className={styles["detail-label"]}>Email:</span>
                                <span className={styles["detail-value"]}>{selectedMessage.email}</span>
                            </div>
                            <div className={styles["detail-row"]}>
                                <span className={styles["detail-label"]}>Subject:</span>
                                <span className={styles["detail-value"]}>{selectedMessage.subject}</span>
                            </div>
                            <div className={styles["detail-row"]}>
                                <span className={styles["detail-label"]}>Date:</span>
                                <span className={styles["detail-value"]}>
                                    {new Date(selectedMessage.date).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className={styles["message-content"]}>
                            {selectedMessage.content}
                        </div>
                        <div className={styles["reply-section"]}>
                            <h3>Reply to Message</h3>
                            <div className={styles["quick-replies"]}>
                                <button className={styles["quick-reply-btn"]} onClick={() => insertTemplate("thank-you")}>
                                    Thank You
                                </button>
                                <button className={styles["quick-reply-btn"]} onClick={() => insertTemplate("test-drive")}>
                                    Test Drive Info
                                </button>
                                <button className={styles["quick-reply-btn"]} onClick={() => insertTemplate("pricing")}>
                                    Pricing Details
                                </button>
                            </div>
                            <form className={styles["reply-form"]} onSubmit={handleReply}>
                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Type your reply..."
                                />
                                <div className={styles["reply-actions"]}>
                                    <button type="button" className={styles["btn-secondary"]} onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={styles["btn-primary"]}>
                                        <i className="ri-send-plane-line" />
                                        Send Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
