"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { booksData } from '@/data/data';

export default function BooksPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAuthor, setSelectedAuthor] = useState('All');

    // Extract unique categories and authors
    const categories = ['All', ...new Set(booksData.map(book => book.category).filter(Boolean))];
    const authors = ['All', ...new Set(booksData.map(book => book.author).filter(Boolean))];

    const filteredBooks = useMemo(() => {
        return booksData.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
            const matchesAuthor = selectedAuthor === 'All' || book.author === selectedAuthor;

            return matchesSearch && matchesCategory && matchesAuthor;
        });
    }, [searchTerm, selectedCategory, selectedAuthor]);

    return (
        <div className="container">
            <h1 className="section-title" style={{ marginTop: '2rem' }}>Our Collection</h1>

            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search books or authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.select}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    <select
                        value={selectedAuthor}
                        onChange={(e) => setSelectedAuthor(e.target.value)}
                        className={styles.select}
                    >
                        {authors.map(auth => <option key={auth} value={auth}>{auth}</option>)}
                    </select>
                </div>
            </div>

            <div className={styles.grid}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div key={book.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                {book.coverImage ? (
                                    <Image
                                        src={book.coverImage}
                                        alt={book.title}
                                        width={200}
                                        height={300}
                                        className={styles.bookImage}
                                    />
                                ) : (
                                    <div className={styles.placeholderImage}>No Image</div>
                                )}
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{book.title}</h3>
                                <p className={styles.author}>{book.author}</p>
                                <p className={styles.price}>${book.price}</p>
                                <Link href={`/books/${book.id}`} className={styles.viewLink}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>No books found matching your criteria.</p>
                )}
            </div>
        </div>
    );
}
