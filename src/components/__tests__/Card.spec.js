import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Components
import ThumbButtonVue from '../ThumbButton.vue';

// Mock
import mockPerson from './mock.json';

// Undet test
import Card from '../Card.vue';

describe('Card component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Card, {
      props: {
        person: mockPerson
      }
    });
  });

  test('should render card message correclty', async () => {
    expect(wrapper.find('[data-test="card-message"]').text()).toBe(mockPerson.info);
    await wrapper.setProps({
      person: {
        ...mockPerson,
        hasVoted: true
      }
    });
    expect(wrapper.find('[data-test="card-message"]').text()).toBe('Thank you for your vote!');
  });

  test('should send correct variant to component', async () => {
    expect(wrapper.findComponent(ThumbButtonVue).vm.variant).toBe('up');
    await wrapper.setProps({
      person: {
        ...mockPerson,
        votes: {
          positive: 1,
          negative: 2
        }
      }
    });
    expect(wrapper.findComponent(ThumbButtonVue).vm.variant).toBe('down');
  });
});
