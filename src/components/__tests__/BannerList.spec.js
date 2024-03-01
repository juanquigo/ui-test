import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Component
import Banner from '../Banner.vue';

// Mock
import mockPerson from './mock.json';

// Undet test
import BannerList from '../BannerList.vue';

describe('Banner list component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BannerList, {
      props: {
        persons: [mockPerson]
      }
    });
  });

  test('should render correctly the persons list', async () => {
    expect(wrapper.findAllComponents(Banner)).toHaveLength(1);
  });
});
