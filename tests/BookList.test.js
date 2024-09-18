import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from './BookList';

const mockBooks = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
];

test('renders book list', () => {
  render(<BookList books={mockBooks} />);
  
  expect(screen.getByText('Book 1')).toBeInTheDocument();
  expect(screen.getByText('Book 2')).toBeInTheDocument();
  expect(screen.getByText('Author 1')).toBeInTheDocument();
  expect(screen.getByText('Author 2')).toBeInTheDocument();
});

test('displays "No books available" when book list is empty', () => {
  render(<BookList books={[]} />);
  
  expect(screen.getByText('No books available')).toBeInTheDocument();
});