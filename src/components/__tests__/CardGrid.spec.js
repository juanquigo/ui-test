import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Component
import Card from '../Card.vue';

// Mock
import mockPerson from './mock.json';

// Undet test
import CardGrid from '../CardGrid.vue';

describe('Card grid component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardGrid, {
      props: {
        persons: [mockPerson]
      }
    });
  });

  test('should render correctly the persons grid', async () => {
    expect(wrapper.findAllComponents(Card)).toHaveLength(1);
  });
});
