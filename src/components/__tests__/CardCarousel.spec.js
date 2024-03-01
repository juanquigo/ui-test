import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Component
import Card from '../Card.vue';

// Mock
import mockPerson from './mock.json';

// Undet test
import CardCarousel from '../CardCarousel.vue';

describe('Card grid component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CardCarousel, {
      props: {
        persons: [mockPerson]
      }
    });
  });

  test('should render correctly the persons carousel', async () => {
    expect(wrapper.findAllComponents(Card)).toHaveLength(1);
  });
});
