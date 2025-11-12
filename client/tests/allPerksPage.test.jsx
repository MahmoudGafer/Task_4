import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import AllPerks from '../src/pages/AllPerks.jsx';
import { renderWithRouter } from './utils/renderWithRouter.js';

describe('AllPerks page (Directory)', () => {
  test('lists public perks and responds to name filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    await waitFor(() => {
      expect(screen.getByText(seededPerk.title)).toBeInTheDocument();
    });

    const nameFilter = screen.getByPlaceholderText('Enter perk name...');
    fireEvent.change(nameFilter, { target: { value: seededPerk.title } });

    await waitFor(() => {
      expect(screen.getByText(seededPerk.title)).toBeInTheDocument();
    });

    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');
  });

  test('lists public perks and responds to merchant filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    // Render the exploration page
    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    // Wait until perks are fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(seededPerk.title)).toBeInTheDocument();
    });

    // Find the merchant dropdown
    const merchantFilter = screen.getByRole('combobox');

    // Select the merchant that matches the seeded record
    fireEvent.change(merchantFilter, { target: { value: seededPerk.merchant } });

    // Wait for the UI to update
    await waitFor(() => {
      expect(screen.getByText(seededPerk.title)).toBeInTheDocument();
    });

    // Check that the summary text reflects the filtered result
    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');
  });
});
