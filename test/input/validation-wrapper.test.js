import React from 'react';
import { shallow } from 'enzyme';
import ValidationWrapper from '../../../../src/components/input/validation-wrapper';
import { expect } from 'chai';

describe('ValidationWrapper', () => {

  it('passes all props to Tooltip', () => {
    const errorTooltipProps = {
      position: 'top',
      mouseEnterDelay: 1000
    };
    const errorMessage= 'Sample error message';
    const validationWrapper= shallow(
      <ValidationWrapper
        isError
        errorMessage={errorMessage}
        errorTooltipProps={errorTooltipProps}
      />
    );
    expect(validationWrapper.find('Tooltip').props()).to.include(errorTooltipProps);
  });
});
