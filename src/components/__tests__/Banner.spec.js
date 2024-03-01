import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Components
import ThumbButtonVue from '../ThumbButton.vue';

// Mock
import mockPerson from './mock.json';

// Undet test
import Banner from '../Banner.vue';

describe('Banner component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Banner, {
      props: {
        person: mockPerson
      }
    });
  });

  test('should render banner message correclty', async () => {
    expect(wrapper.find('[data-test="banner-message"]').text()).toBe(mockPerson.info);
    await wrapper.setProps({
      person: {
        ...mockPerson,
        hasVoted: true
      }
    });
    expect(wrapper.find('[data-test="banner-message"]').text()).toBe('Thank you for your vote!');
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
