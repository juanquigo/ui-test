import { setActivePinia, createPinia } from 'pinia';
import { useCounterStore } from '../counter';
import { beforeEach, describe, test, expect, vi } from 'vitest';

// Mock
import mockPersons from './mock.json';

describe('Counter Store', () => {
  const mockJson = vi.fn().mockResolvedValue(mockPersons);

  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockResolvedValue({ ok: true, json: mockJson });
    setActivePinia(createPinia());
  });

  test('should get persons', async () => {
    const counterStore = useCounterStore();
    await counterStore.getPersons();
    expect(counterStore.persons).toHaveLength(6);
    counterStore.persons = [];
    vi.spyOn(window, 'fetch').mockResolvedValue({ ok: false });
    await counterStore.getPersons();
    expect(counterStore.persons).toHaveLength(0);
  });

  describe('on user vote', async () => {
    test('should vote positive', async () => {
      const counterStore = useCounterStore();
      await counterStore.getPersons();
      counterStore.setCurrentThumb('people:1', 'up');
      expect(counterStore.persons[0].currentThumb).toBe('up');
      const oldVotes = counterStore.persons[0].votes.positive;
      await counterStore.setVote('people:1');
      expect(counterStore.persons[0].votes.positive).toEqual(oldVotes + 1);
    });

    test('should vote negative', async () => {
      const counterStore = useCounterStore();
      await counterStore.getPersons();
      counterStore.setCurrentThumb('people:1', 'down');
      expect(counterStore.persons[0].currentThumb).toBe('down');
      const oldVotes = counterStore.persons[0].votes.negative;
      await counterStore.setVote('people:1');
      expect(counterStore.persons[0].votes.negative).toEqual(oldVotes + 1);
    });

    test('should reset on vote again', async () => {
      const counterStore = useCounterStore();
      await counterStore.getPersons();
      counterStore.persons[0].hasVoted = true;
      await counterStore.setVote('people:1');
      expect(counterStore.persons[0].hasVoted).toBeFalsy();
      expect(counterStore.persons[0].currentThumb).toBeNull();
    });

    test('should return error message', async () => {
      const counterStore = useCounterStore();
      await counterStore.getPersons();
      vi.spyOn(window, 'fetch').mockResolvedValue({ ok: false });
      window.alert = vi.fn();
      await counterStore.setVote('people:1');
      expect(window.alert).toBeCalledWith('Error saving vote');
    });
  });
});
