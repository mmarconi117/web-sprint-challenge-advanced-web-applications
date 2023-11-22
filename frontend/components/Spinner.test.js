import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders default spinner', () => {
  const { getByTestId } = render(<Spinner />);
  const spinnerElement = getByTestId('spinner');

  expect(spinnerElement).toBeInTheDocument();
  expect(spinnerElement).toHaveClass('spinner');
});

test('renders custom text', () => {
  const customText = 'Loading...';
  const { getByText } = render(<Spinner text={customText} />);
  const textElement = getByText(customText);

  expect(textElement).toBeInTheDocument();
});

test('renders with custom size', () => {
  const customSize = 50;
  const { getByTestId } = render(<Spinner size={customSize} />);
  const spinnerElement = getByTestId('spinner');

  expect(spinnerElement).toBeInTheDocument();
  expect(spinnerElement).toHaveStyle(`width: ${customSize}px`);
  expect(spinnerElement).toHaveStyle(`height: ${customSize}px`);
});

test('renders with custom color', () => {
  const customColor = 'red';
  const { getByTestId } = render(<Spinner color={customColor} />);
  const spinnerElement = getByTestId('spinner');

  expect(spinnerElement).toBeInTheDocument();
  expect(spinnerElement).toHaveStyle(`border-top-color: ${customColor}`);
  expect(spinnerElement).toHaveStyle(`border-left-color: ${customColor}`);
});
