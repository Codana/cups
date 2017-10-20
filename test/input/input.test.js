import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Input, { CLASS_NAMES, LabeledInput, SimpleInput } from '../../../../src/components/input/input';
import ValidationWrapper from '../../../../src/components/input/validation-wrapper';
import Label from '../../../../src/components/label/label';
import { reactIntl } from '../../../../src/common/utils/i18n/i18n';
const {
  FormattedMessage,
} = reactIntl;




const requiredProps = {};

const defaultExpectedProps = {
  type: 'text',
  className: 'input text-default',
  defaultValue: undefined,
  disabled: false,
  placeholder: '',
  onChange: undefined,
  value: undefined,
  onBlur: undefined,
  'data-test-key': 'simple-input',
  id: undefined,
};

describe('Input', function () {

  it('exports CLASS_NAMES with at least BLOCK', function () {
    expect(CLASS_NAMES).to.include.keys('BLOCK');
  });

  describe('LabeledInput component', function () {
    let renderer;
    beforeEach(function () {
      renderer = TestUtils.createRenderer();
    });

    it('LabeledInput passes correct props to the SimpleInput [enzyme]', function() {
      const errorTooltipProps = { position: 'topLeft' };
      const expectedProps = {
        isError: true,
        isValid: false,
        errorMessage: 'Error message'
      };

      const labeledInput = shallow(
        <LabeledInput {...requiredProps} id="my-input"  label="my-input" isError errorMessage="Error message" errorTooltipProps={errorTooltipProps} />
      );
      const simpleInput = labeledInput.find(SimpleInput);
      expect(simpleInput.props()).to.include(expectedProps);
      expect(simpleInput.prop('errorTooltipProps')).to.deep.equal(errorTooltipProps);
    });

    it('should render component container with default class', function () {

      renderer.render(<LabeledInput id="my-input" label="my-input" />);
      const renderedComponent = renderer.getRenderOutput();

      expect(renderedComponent.type).to.equal('div');
      expect(renderedComponent.props.className).to.equal('labeled-input');
    });

    it('should render label with default props', function () {

      renderer.render(<LabeledInput id="my-input" />);
      const renderedComponent = renderer.getRenderOutput();

      expect(renderedComponent.props.children[0])
        .to.eql(<Label
          htmlFor="my-input" text="" isRequired={false} className=""
          data-test-key="simple-input-label"
        />);
    });

    it('should render label with given properties', function () {

      renderer.render(<LabeledInput id="my-input" label="my label text" isRequired labelClassName="my-label" />);
      const renderedComponent = renderer.getRenderOutput();

      expect(renderedComponent.props.children[0])
        .to.eql(<Label
          htmlFor="my-input" text="my label text" isRequired className="my-label"
          data-test-key="simple-input-label"
        />);
    });

  });

  describe('SimpleInput component', function () {
    let renderer;
    beforeEach(function () {
      renderer = TestUtils.createRenderer();
    });

    it('SimpleInput passes correct props to the ValidationWrapper [enzyme]', function() {
      const errorTooltipProps = { position: 'topLeft' };
      const expectedProps = {
        isError: true,
        isValid: false,
        errorMessage: 'Error message'
      };

      const simpleInput = shallow(
        <SimpleInput {...requiredProps} isError errorMessage="Error message" errorTooltipProps={errorTooltipProps} />
      );
      const validationWrapper = simpleInput.find('ValidationWrapper');
      expect(validationWrapper.props()).to.include(expectedProps);
      expect(validationWrapper.prop('errorTooltipProps')).to.deep.equal(errorTooltipProps);
    });

    it('should render input container', function () {

      renderer.render(<SimpleInput />);
      const renderedComponent = renderer.getRenderOutput();

      expect(renderedComponent.type).to.eql('div');
      expect(renderedComponent.props.className).to.eql('input-container');
    });

    it('should render input field with default attributes', function () {

      renderer.render(<SimpleInput />);
      const renderedComponent = renderer.getRenderOutput();

      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
        />
      );

      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

    it('should render main element field with custom class', function () {

      renderer.render(<SimpleInput className="my-input-class" />);
      const renderedComponent = renderer.getRenderOutput();

      const expectedClass = 'input-container my-input-class';

      const renderedClass = renderedComponent.props.className;

      expect(renderedClass).to.eql(expectedClass);
    });

    it('should render input field as disabled', function () {

      renderer.render(<SimpleInput isDisabled />);
      const renderedComponent = renderer.getRenderOutput();

      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
          className="input text-default input--state-disabled"
          disabled
        />
      );

      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

    it('should render input field as erroneus', function () {

      renderer.render(<SimpleInput isError />);
      const renderedComponent = renderer.getRenderOutput();

      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
          className="input text-default input--state-error"
        />
      );

      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

    it('should render input field as valid', function () {

      renderer.render(<SimpleInput isValid />);
      const renderedComponent = renderer.getRenderOutput();

      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
          className="input text-default input--state-valid"
        />
      );

      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

    it('should render input field with initial value', function () {

      const expectedDefaultValue = 'initial input value';

      renderer.render(<SimpleInput defaultValue={expectedDefaultValue} />);
      const renderedComponent = renderer.getRenderOutput();

      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
          defaultValue={expectedDefaultValue}
        />
      );

      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

    it('should render placeholder', function () {

      const expectedPlaceholder = 'my placeholder';

      renderer.render(<SimpleInput placeholder={expectedPlaceholder} />);
      const renderedComponent = renderer.getRenderOutput();

      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
          placeholder={expectedPlaceholder}
        />
      );

      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

    it('should pass string error message to validation wrapper', function () {
      const expectedErrorMessage = 'my placeholder';

      const wrapper = shallow(<SimpleInput errorMessage={expectedErrorMessage} />);
      expect(wrapper.containsMatchingElement(
        <ValidationWrapper
          errorMessage={expectedErrorMessage}
          data-test-key="simple-input-error"
          errorTooltipProps={{ position: 'topRight' }}
        />
      )).to.equal(true);
    });

    it('should pass localized error message to validation wrapper', function () {
      const localizedErrorMessageId = 'my placeholder';

      const wrapper = shallow(<SimpleInput errorMessage={<FormattedMessage id={localizedErrorMessageId} />} />);
      expect(wrapper.containsMatchingElement(
        <ValidationWrapper
          errorMessage={<FormattedMessage id={localizedErrorMessageId} />}
          data-test-key="simple-input-error"
          errorTooltipProps={{ position: 'topRight' }}
        />
      )).to.equal(true);
    });

    it('should invoke callback when content of <input> changes', function () {
      let changeEvent;
      const inputChange = event => {
        changeEvent = event;
      };

      const inputComponent = TestUtils.renderIntoDocument(<SimpleInput id="my-input" onChange={inputChange} />);
      const input = TestUtils.findRenderedDOMComponentWithTag(inputComponent, 'input');
      TestUtils.Simulate.change(input, 'n');

      expect(changeEvent[0]).to.equal('n');
    });

    it('should invoke onBlur callback when content of <input> changes and focus lost', function () {
      let changeEvent;
      const inputChange = event => {
        changeEvent = event;
      };

      const inputComponent = TestUtils.renderIntoDocument(<SimpleInput onBlur={inputChange} />);
      const input = TestUtils.findRenderedDOMComponentWithTag(inputComponent, 'input');
      TestUtils.Simulate.blur(input, 'n');
      expect(changeEvent[0]).to.equal('n');
    });

    it('should manage the input as a controlled input', function () {
      const expectedValue = "Hi, I'm the new value!";
      renderer.render(
        <SimpleInput value={expectedValue} />
      );
      const renderedComponent = renderer.getRenderOutput();
      const renderedInput = renderedComponent.props.children[0];
      const expectedInput = (
        <input
          {...defaultExpectedProps}
          value={expectedValue}
        />
      );
      const renderedAttributes = renderedInput.props;
      const expectedAttributes = expectedInput.props;

      expect(renderedAttributes).to.eql(expectedAttributes);
    });

  });


  describe('Input component', function () {
    describe('with minimal required props', function () {
      before(function () {
        this.wrapper = mount(
          <Input {...requiredProps} />
        );
        this.simpleInput = this.wrapper.find(SimpleInput);
        this.input = this.wrapper.find('input');
      });

      after(function () {
        this.wrapper.unmount();
      });

      it('should pass correct props to the LabeledInput [enzyme]', function() {
        const errorTooltipProps = { position: 'topLeft' };
        const expectedProps = {
          isError: true,
          isValid: false,
          errorMessage: 'Error message'
        };

        const input = shallow(
          <Input {...requiredProps} id="my-input"  label="my-input" isError errorMessage="Error message" errorTooltipProps={errorTooltipProps} />
        );
        const labeledInput = input.find(LabeledInput);
        expect(labeledInput.props()).to.include(expectedProps);
        expect(labeledInput.prop('errorTooltipProps')).to.deep.equal(errorTooltipProps);
      });

      it('should pass correct props to the SimpleInput [enzyme]', function() {
        const errorTooltipProps = { position: 'topLeft' };
        const expectedProps = {
          isError: true,
          isValid: false,
          errorMessage: 'Error message'
        };

        const input = shallow(
          <Input {...requiredProps} id="my-input"  isError errorMessage="Error message" errorTooltipProps={errorTooltipProps} />
        );
        const simpleInput = input.find(SimpleInput);
        expect(simpleInput.props()).to.include(expectedProps);
        expect(simpleInput.prop('errorTooltipProps')).to.deep.equal(errorTooltipProps);
      });

      it('should set refs to point to the main component and the input element', function () {
        this.wrapper.props();
        const mainComponentRef = this.wrapper.instance()._input;
        const baseInputRef = this.wrapper.instance().baseInput;
        expect(mainComponentRef).to.eql(this.simpleInput.getNode());
        expect(baseInputRef).to.eql(this.input.getNode());
      });
    });
  });



  describe('Common tests for <Input>, <LabeledInput>, and <SimpleInput>:', function () {

    const components = {
      'Input': Input,
      'LabeledInput': LabeledInput,
      'SimpleInput': SimpleInput,
    };

    Object.keys(components).forEach(function(componentName, callback) {

      const Component = components[componentName];

      describe(`<${componentName}>`, function () {

        it('should return value of <input> field when using ref.value', function () {

          const expectedInitialValue = '';
          const expectedChangedValue = 'changed value';

          const component = TestUtils.renderIntoDocument(<Component id="my-input" />);

          expect(component.value).to.equal(expectedInitialValue);

          const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

          inputNode.value = expectedChangedValue;

          expect(component.value).to.equal(expectedChangedValue);
        });

        it('should set <input>.type when props.type is given', function () {

          const expectedType = 'password';

          const component = TestUtils.renderIntoDocument(<Component id="my-input" type={expectedType} />);

          const inputNode = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

          expect(inputNode.type).to.eql(expectedType);

        });
      });
    });
  });
});
