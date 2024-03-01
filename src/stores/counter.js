import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/people`;
const DATE_UNITS = {
  year: 31540000,
  month: 2628000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
};

const getUnitAndValueDate = (secondsElapsed) => {
  const rtf = new Intl.RelativeTimeFormat();

  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;

      return rtf.format(value, unit);
    }
  }
};

export const useCounterStore = defineStore('counter', () => {
  const persons = ref([]);
  const mappedPersons = computed(() => persons.value);

  const setCurrentThumb = (id, variant) => {
    const currentPerson = persons.value.find(({ id: personId }) => personId === id);
    currentPerson.currentThumb = variant;
  };

  const setVote = async (id) => {
    const currentPerson = persons.value.find(({ id: personId }) => personId === id);

    if (currentPerson.hasVoted) {
      currentPerson.currentThumb = null;
      currentPerson.hasVoted = false;

      return;
    }

    const newVotes = { ...currentPerson.votes };

    currentPerson.currentThumb === 'up' ? (newVotes.positive += 1) : (newVotes.negative += 1);
    newVotes.total = newVotes.positive + newVotes.negative;

    const isOk = await sendVote(currentPerson.id, {
      votes: { positive: newVotes.positive, negative: newVotes.negative }
    });

    if (isOk) {
      currentPerson.votes = { ...newVotes };
      currentPerson.hasVoted = true;

      return;
    }

    currentPerson.currentThumb = null;
    currentPerson.hasVoted = false;
    alert('Error saving vote');
  };

  const getPersons = async () => {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      return;
    }

    const rawPersons = await response.json();
    persons.value = rawPersons.map((person) => {
      const totalOfVotes = Object.values(person.votes).reduce(
        (total, current) => current + total,
        0
      );
      const timeAgo = getUnitAndValueDate(
        (Date.now() - new Date(person.lastUpdated).getTime()) / 1000
      );

      return {
        ...person,
        info: `${timeAgo} in ${person.category.charAt(0).toUpperCase()}${person.category.slice(1)}`,
        currentThumb: null,
        hasVoted: false,
        votes: {
          ...person.votes,
          total: totalOfVotes
        }
      };
    });
  };

  const sendVote = async (id, payload) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });

    return response.ok;
  };

  return { persons, mappedPersons, getPersons, setCurrentThumb, setVote };
});
