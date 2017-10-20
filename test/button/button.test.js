import React from 'react';
import TestUtils, { Simulate } from 'react-dom/test-utils';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import sinon from 'sinon';

import Icon from '../../../../src/components/icon/svg-icon';
import LoadingIcon from '../../../../src/components/loading-icon/loading-icon';
import Button, { CLASS_NAMES } from '../../../../src/components/button/button';




const requiredProps = {
  text: 'mock-text'
};

describe('Button component', function () {
  const renderer = TestUtils.createRenderer();

  it('exports CLASS_NAMES with at least BLOCK', function () {
    expect(CLASS_NAMES).to.include.keys('BLOCK');
  });

  it('should render button with given text', function () {
    const expectedText = 'Basic button';

    renderer.render(
      <Button
        text={expectedText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('button');
    expect(result.props.children.props.children).to.eql([
      undefined, // TODO: Fix Button code to not have an undefined children[0] when no icons are shown?
      <span className="button__text text-action">
        {expectedText}
      </span>,
    ]);
  });

  it('should render button with given text [enzyme]', function () {
    const expectedText = 'Basic button';

    const wrapper = enzyme.shallow(
      <Button text={expectedText} onClick={function handleClick(event) {}} />
    );

    expect(wrapper.type()).to.equal('button');
    expect(wrapper.find('span.button__text.text-action').text()).to.equal(expectedText);
  });

  it('should show icon if `iconName` is given', function () {
    const expectedText = 'Button with icon';

    renderer.render(
      <Button
        iconName="confirmation"
        text={expectedText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('button');
    expect(result.props.children.props.children).to.eql([
      <Icon
        iconName="confirmation"
        className="button__icon"
      />,
      <span className="button__text text-action button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should show icon if `iconName` is given [enzyme]', function () {
    const expectedText = 'Button with icon';

    const wrapper = enzyme.shallow(
      <Button text={expectedText} iconName="confirmation" onClick={function handleClick(event) {}} />
    );
    const iconWrapper = wrapper.childAt(0).childAt(0);
    const textWrapper = wrapper.childAt(0).childAt(1);

    expect(iconWrapper.type()).to.equal(Icon);
    expect(iconWrapper.prop('iconName')).to.equal('confirmation');
    expect(iconWrapper.prop('className')).to.equal('button__icon');
    expect(textWrapper.type()).to.equal('span');
    expect(textWrapper.text()).to.equal(expectedText);
    expect(textWrapper.prop('className')).to.contain('text-action');
    expect(textWrapper.prop('className')).to.contain('button--with-icon__text');
  });

  it('should render icon only if no text is provided [enzyme]', function () {

    const wrapper = enzyme.shallow(
      <Button iconName="confirmation" onClick={function handleClick(event) {}} />
    );
    const iconWrapper = wrapper.childAt(0).childAt(0);
    expect(iconWrapper.type()).to.equal(Icon);
    expect(iconWrapper.prop('iconName')).to.equal('confirmation');
    expect(iconWrapper.prop('className')).to.equal('button__icon');

    expect(wrapper.type()).to.equal('button');
    expect(wrapper.find('span.button__text.text-action').length).to.equal(0);
  });

  it('should show loading icon if `isLoading` is true', function () {
    const givenText = 'Button with loading icon';
    const expectedText = 'Loading...';

    renderer.render(
      <Button
        isLoading
        text={givenText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('button');
    expect(result.props.children.props.children).to.eql([
      <LoadingIcon />,
      <span className="button__text text-action button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should show loading icon if `isLoading` is true with disabled style', function () {
    const givenText = 'Button with loading icon';
    const expectedText = 'Loading...';

    renderer.render(
      <Button
        isLoading
        isDisabled
        text={givenText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('button');
    expect(result.props.children.props.children).to.eql([
      <LoadingIcon className="button--disabled__loading-icon" />,
      <span className="button__text text-action button--disabled__text button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should show loading icon if `isLoading` is true with disabled primary style', function () {
    const givenText = 'Button with loading icon';
    const expectedText = 'Loading...';

    renderer.render(
      <Button
        isLoading
        isDisabled
        isPrimary
        text={givenText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('button');
    expect(result.props.children.props.children).to.eql([
      <LoadingIcon className="button--disabled--primary__loading-icon" />,
      <span className="button__text text-action text-action--inversed button--disabled__text button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should show loading icon instead of `iconName` icon if `isLoading` is true', function () {
    const givenText = 'Button with loading icon';
    const expectedText = 'Loading...';

    renderer.render(
      <Button
        isLoading
        iconName="confirmation"
        text={givenText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.eql('button');
    expect(result.props.children.props.children).to.eql([
      <LoadingIcon />,
      <span className="button__text text-action button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should include disabled classes if `isDisabled` is true', function () {
    const expectedText = 'Disabled confirm button';

    renderer.render(
      <Button
        isDisabled
        iconName="confirmation"
        text={expectedText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.eql('button');
    expect(result.props.disabled).to.be.true;
    expect(result.props.children.props.children).to.eql([
      <Icon
        iconName="confirmation"
        className="button__icon button--disabled__icon"
      />,
      <span className="button__text text-action button--disabled__text button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should include correct classes and render expected text if `props.noLoadingText` is set', function () {

    /**
     * Button's normal text needs to be visible in DOM, as the width of the
     * button is based on the button's text. Text is hidden in css, based on
     * the expected className.
     */
    const expectedText = 'Loading button without text';
    const expectedClassName = 'button--no-loading-text';

    renderer.render(
      <Button
        isLoading
        noLoadingText
        text={expectedText}
        onClick={function handleClick(event) {}}
      />
    );
    const result = renderer.getRenderOutput();

    expect(result.type).to.eql('button');
    expect(result.props.className.split(' ')).to.include.members([ expectedClassName ]);
    expect(result.props.children.props.children).to.eql([
      <LoadingIcon />,
      <span className="button__text text-action button--with-icon__text">
        {expectedText}
      </span>,
    ]);
  });

  it('should use the given `onClick` callback method', function () {
    let spyCallCount = 0;
    const spy = event => {
      spyCallCount++;
    };

    const buttonComponent = TestUtils.renderIntoDocument(
      <Button
        text="Button"
        onClick={spy}
      />
    );
    const button = TestUtils.findRenderedDOMComponentWithTag(buttonComponent, 'button');

    Simulate.click(button);
    expect(spyCallCount).to.equal(1);

    Simulate.click(button);
    expect(spyCallCount).to.equal(2);
  });

  it('should have proper params', function () {
    const isDraggable = true;
    renderer.render(
      <Button
        id="testId"
        text="testText"
        aria-label="testAriaTitle"
        draggable={isDraggable}
      />
    );
    const renderedElem = renderer.getRenderOutput();
    expect(renderedElem).to.be.an('object');

    const props = renderedElem.props;
    expect(props.id).to.equal('testId');
    expect(props['aria-label']).to.equal('testAriaTitle');
    expect(props.draggable).to.be.true;
  });

  describe('is rendered with', function () {
    it('no icon by default', function () {
      renderer.render(
        <Button text="My button"></Button>
      );
      const result = renderer.getRenderOutput();
      expect(result.type).to.be.equal('button');
      expect(result.props.children[0]).to.be.undefined;
    });

    it('custom classname if it is set', function () {
      renderer.render(
        <Button className="my-class" text="My button"></Button>
      );
      const result = renderer.getRenderOutput();
      expect(result.type).to.be.equal('button');
      expect(result.props.className).to.contain('button');
      expect(result.props.className).to.contain('my-class');
    });
  });

  describe('logs an error', function () {
    // it('if an invalid icon name is given', function () {
    //   renderer.render(
    //     <Button iconName="xxx" text="foo"></Button>
    //   );
    //   // NOTE! Two messages, one from Button and other from Icon.
    //   expect(console.error).to.have.property('callCount', 1); //eslint-disable-line no-console
    //   expect(console.error.lastCall.args[0]).to.contain('Invalid prop `iconName`'); // eslint-disable-line no-console
    //   console.error.reset(); //eslint-disable-line no-console
    // });

    it('if no iconName or text is provided', function () {
      renderer.render(
        <Button></Button>
      );
      expect(console.error).to.have.property('callCount', 1); //eslint-disable-line no-console
      expect(console.error.lastCall.args[0]).to.contain('Either iconName or text prop is required!'); // eslint-disable-line no-console
      console.error.reset(); //eslint-disable-line no-console
    });
  });

  describe('in disabled state, with icon, wrapped in a parent and with a click handler', function() {
    before(function() {
      this.parentClickHandler = sinon.stub();
      this.buttonClickHandler = sinon.stub();
      this.wrapper = enzyme.mount(
        <div //eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, this element is used for testing purposes
          onClick={this.parentClickHandler}
        >
          <Button
            {...requiredProps}
            iconName="user"
            isDisabled
            onClick={this.buttonClickHandler}
          />
        </div>
      );
      this.button = this.wrapper.find(Button);
      this.buttonContent = this.wrapper.find(`.${CLASS_NAMES.CONTENT}`);
      this.buttonIcon = this.wrapper.find(`.${CLASS_NAMES.BUTTON_ICON}`);
    });

    afterEach(function() {
      this.parentClickHandler.reset();
      this.buttonClickHandler.reset();
    });

    after(function() {
      this.wrapper.unmount();
    });

    it('does not call button click handler if user clicks on the button', function() {
      this.button.simulate('click');
      expect(this.buttonClickHandler).to.have.property('callCount', 0);
      expect(this.parentClickHandler).to.have.property('callCount', 1);
    });

    it('does not call button click handler if user clicks on the button content wrapper', function() {
      this.buttonContent.simulate('click');
      expect(this.buttonClickHandler).to.have.property('callCount', 0);
      expect(this.parentClickHandler).to.have.property('callCount', 1);
    });

    it('does not call button click handler if user clicks on the button icon', function() {
      this.buttonIcon.simulate('click');
      expect(this.buttonClickHandler).to.have.property('callCount', 0);
      expect(this.parentClickHandler).to.have.property('callCount', 1);
    });
  });

  describe('in enabled state, with icon, wrapped in a parent and with a click handler', function() {
    before(function() {
      this.parentClickHandler = sinon.stub();
      this.buttonClickHandler = sinon.stub();
      this.wrapper = enzyme.mount(
        <div //eslint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, this element is used for testing purposes
          onClick={this.parentClickHandler}
        >
          <Button
            {...requiredProps}
            iconName="user"
            onClick={this.buttonClickHandler}
          />
        </div>
      );
      this.button = this.wrapper.find(Button);
      this.buttonContent = this.wrapper.find(`.${CLASS_NAMES.CONTENT}`);
      this.buttonIcon = this.wrapper.find(`.${CLASS_NAMES.BUTTON_ICON}`);
    });

    afterEach(function() {
      this.parentClickHandler.reset();
      this.buttonClickHandler.reset();
    });

    after(function() {
      this.wrapper.unmount();
    });

    it('calls all handlers if user clicks on the button', function() {
      this.button.simulate('click');
      expect(this.buttonClickHandler).to.have.property('callCount', 1);
      expect(this.parentClickHandler).to.have.property('callCount', 1);
    });

    it('calls all handlers if user clicks on the button content wrapper', function() {
      this.buttonContent.simulate('click');
      expect(this.buttonClickHandler).to.have.property('callCount', 1);
      expect(this.parentClickHandler).to.have.property('callCount', 1);
    });

    it('calls all handlers if user clicks on the button icon', function() {
      this.buttonIcon.simulate('click');
      expect(this.buttonClickHandler).to.have.property('callCount', 1);
      expect(this.parentClickHandler).to.have.property('callCount', 1);
    });
  });
});
