import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useMediaQuery, useTheme } from '@mui/material';

import { useMobileView } from '../useMobileView';

vi.mock('@mui/material', () => ({
  useTheme: vi.fn(),
  useMediaQuery: vi.fn(),
}));

describe('useMobileView Hook', () => {
  it('should return true for mobile view when breakpoint down sm query matches', () => {
    const mockTheme = {
      breakpoints: {
        down: vi.fn().mockReturnValue('(max-width: 600px)'),
      },
    };

    vi.mocked(useTheme).mockReturnValue(mockTheme);
    vi.mocked(useMediaQuery).mockReturnValue(true);

    const { result } = renderHook(() => useMobileView());

    expect(result.current).toBe(true);
    expect(mockTheme.breakpoints.down).toHaveBeenCalledWith('sm');
    expect(useMediaQuery).toHaveBeenCalledWith('(max-width: 600px)');
  });

  it('should return false for desktop view when breakpoint down sm query does not match', () => {
    const mockTheme = {
      breakpoints: {
        down: vi.fn().mockReturnValue('(max-width: 600px)'),
      },
    };

    vi.mocked(useTheme).mockReturnValue(mockTheme);
    vi.mocked(useMediaQuery).mockReturnValue(false);

    const { result } = renderHook(() => useMobileView());

    expect(result.current).toBe(false);
    expect(mockTheme.breakpoints.down).toHaveBeenCalledWith('sm');
    expect(useMediaQuery).toHaveBeenCalledWith('(max-width: 600px)');
  });
});
