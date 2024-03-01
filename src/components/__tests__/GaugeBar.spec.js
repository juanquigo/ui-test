import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Mock
import mockPerson from './mock.json';

// Undet test
import GaugeBar from '../GaugeBar.vue';

describe('Gauge bar component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GaugeBar, {
      props: {
        votes: mockPerson.votes
      }
    });
  });

  test('should render percentages correctly', async () => {
    expect(wrapper.findAll('.gauge-bar__text').at(0).text()).toBe('90%');
    expect(wrapper.findAll('.gauge-bar__text').at(1).text()).toBe('10%');
  });
});
