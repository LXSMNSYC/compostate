import { RefAttributes, VElement, VNode } from '../types';
import {
  ClipboardEventHandler,
  CompositionEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  DragEventHandler,
  TouchEventHandler,
  PointerEventHandler,
  UIEventHandler,
  WheelEventHandler,
  AnimationEventHandler,
  TransitionEventHandler,
  GenericEventHandler,
} from './event-handler';

export interface DOMAttributes<Target extends EventTarget> {
  children?: VNode;
  innerHTML?: string;
  textContent?: string;
  // dangerouslySetInnerHTML?: {
  //     __html: string;
  // } | undefined;

  // Image Events
  onLoad?: GenericEventHandler<Target>;
  onLoadCapture?: GenericEventHandler<Target>;
  onError?: GenericEventHandler<Target>;
  onErrorCapture?: GenericEventHandler<Target>;

  // Clipboard Events
  onCopy?: ClipboardEventHandler<Target>;
  onCopyCapture?: ClipboardEventHandler<Target>;
  onCut?: ClipboardEventHandler<Target>;
  onCutCapture?: ClipboardEventHandler<Target>;
  onPaste?: ClipboardEventHandler<Target>;
  onPasteCapture?: ClipboardEventHandler<Target>;

  // Composition Events
  onCompositionEnd?: CompositionEventHandler<Target>;
  onCompositionEndCapture?: CompositionEventHandler<Target>;
  onCompositionStart?: CompositionEventHandler<Target>;
  onCompositionStartCapture?: CompositionEventHandler<Target>;
  onCompositionUpdate?: CompositionEventHandler<Target>;
  onCompositionUpdateCapture?: CompositionEventHandler<Target>;

  // Details Events
  onToggle?: GenericEventHandler<Target>;

  // Focus Events
  onFocus?: FocusEventHandler<Target>;
  onFocusCapture?: FocusEventHandler<Target>;
  onBlur?: FocusEventHandler<Target>;
  onBlurCapture?: FocusEventHandler<Target>;

  // Form Events
  onChange?: GenericEventHandler<Target>;
  onChangeCapture?: GenericEventHandler<Target>;
  onInput?: GenericEventHandler<Target>;
  onInputCapture?: GenericEventHandler<Target>;
  onSearch?: GenericEventHandler<Target>;
  onSearchCapture?: GenericEventHandler<Target>;
  onSubmit?: GenericEventHandler<Target>;
  onSubmitCapture?: GenericEventHandler<Target>;
  onInvalid?: GenericEventHandler<Target>;
  onInvalidCapture?: GenericEventHandler<Target>;
  onReset?: GenericEventHandler<Target>;
  onResetCapture?: GenericEventHandler<Target>;
  onFormData?: GenericEventHandler<Target>;
  onFormDataCapture?: GenericEventHandler<Target>;

  // Keyboard Events
  onKeyDown?: KeyboardEventHandler<Target>;
  onKeyDownCapture?: KeyboardEventHandler<Target>;
  onKeyPress?: KeyboardEventHandler<Target>;
  onKeyPressCapture?: KeyboardEventHandler<Target>;
  onKeyUp?: KeyboardEventHandler<Target>;
  onKeyUpCapture?: KeyboardEventHandler<Target>;

  // Media Events
  onAbort?: GenericEventHandler<Target>;
  onAbortCapture?: GenericEventHandler<Target>;
  onCanPlay?: GenericEventHandler<Target>;
  onCanPlayCapture?: GenericEventHandler<Target>;
  onCanPlayThrough?: GenericEventHandler<Target>;
  onCanPlayThroughCapture?: GenericEventHandler<Target>;
  onDurationChange?: GenericEventHandler<Target>;
  onDurationChangeCapture?: GenericEventHandler<Target>;
  onEmptied?: GenericEventHandler<Target>;
  onEmptiedCapture?: GenericEventHandler<Target>;
  onEncrypted?: GenericEventHandler<Target>;
  onEncryptedCapture?: GenericEventHandler<Target>;
  onEnded?: GenericEventHandler<Target>;
  onEndedCapture?: GenericEventHandler<Target>;
  onLoadedData?: GenericEventHandler<Target>;
  onLoadedDataCapture?: GenericEventHandler<Target>;
  onLoadedMetadata?: GenericEventHandler<Target>;
  onLoadedMetadataCapture?: GenericEventHandler<Target>;
  onLoadStart?: GenericEventHandler<Target>;
  onLoadStartCapture?: GenericEventHandler<Target>;
  onPause?: GenericEventHandler<Target>;
  onPauseCapture?: GenericEventHandler<Target>;
  onPlay?: GenericEventHandler<Target>;
  onPlayCapture?: GenericEventHandler<Target>;
  onPlaying?: GenericEventHandler<Target>;
  onPlayingCapture?: GenericEventHandler<Target>;
  onProgress?: GenericEventHandler<Target>;
  onProgressCapture?: GenericEventHandler<Target>;
  onRateChange?: GenericEventHandler<Target>;
  onRateChangeCapture?: GenericEventHandler<Target>;
  onSeeked?: GenericEventHandler<Target>;
  onSeekedCapture?: GenericEventHandler<Target>;
  onSeeking?: GenericEventHandler<Target>;
  onSeekingCapture?: GenericEventHandler<Target>;
  onStalled?: GenericEventHandler<Target>;
  onStalledCapture?: GenericEventHandler<Target>;
  onSuspend?: GenericEventHandler<Target>;
  onSuspendCapture?: GenericEventHandler<Target>;
  onTimeUpdate?: GenericEventHandler<Target>;
  onTimeUpdateCapture?: GenericEventHandler<Target>;
  onVolumeChange?: GenericEventHandler<Target>;
  onVolumeChangeCapture?: GenericEventHandler<Target>;
  onWaiting?: GenericEventHandler<Target>;
  onWaitingCapture?: GenericEventHandler<Target>;

  // MouseEvents
  onClick?: MouseEventHandler<Target>;
  onClickCapture?: MouseEventHandler<Target>;
  onContextMenu?: MouseEventHandler<Target>;
  onContextMenuCapture?: MouseEventHandler<Target>;
  onDblClick?: MouseEventHandler<Target>;
  onDblClickCapture?: MouseEventHandler<Target>;
  onDrag?: DragEventHandler<Target>;
  onDragCapture?: DragEventHandler<Target>;
  onDragEnd?: DragEventHandler<Target>;
  onDragEndCapture?: DragEventHandler<Target>;
  onDragEnter?: DragEventHandler<Target>;
  onDragEnterCapture?: DragEventHandler<Target>;
  onDragExit?: DragEventHandler<Target>;
  onDragExitCapture?: DragEventHandler<Target>;
  onDragLeave?: DragEventHandler<Target>;
  onDragLeaveCapture?: DragEventHandler<Target>;
  onDragOver?: DragEventHandler<Target>;
  onDragOverCapture?: DragEventHandler<Target>;
  onDragStart?: DragEventHandler<Target>;
  onDragStartCapture?: DragEventHandler<Target>;
  onDrop?: DragEventHandler<Target>;
  onDropCapture?: DragEventHandler<Target>;
  onMouseDown?: MouseEventHandler<Target>;
  onMouseDownCapture?: MouseEventHandler<Target>;
  onMouseEnter?: MouseEventHandler<Target>;
  onMouseEnterCapture?: MouseEventHandler<Target>;
  onMouseLeave?: MouseEventHandler<Target>;
  onMouseLeaveCapture?: MouseEventHandler<Target>;
  onMouseMove?: MouseEventHandler<Target>;
  onMouseMoveCapture?: MouseEventHandler<Target>;
  onMouseOut?: MouseEventHandler<Target>;
  onMouseOutCapture?: MouseEventHandler<Target>;
  onMouseOver?: MouseEventHandler<Target>;
  onMouseOverCapture?: MouseEventHandler<Target>;
  onMouseUp?: MouseEventHandler<Target>;
  onMouseUpCapture?: MouseEventHandler<Target>;

  // Selection Events
  onSelect?: GenericEventHandler<Target>;
  onSelectCapture?: GenericEventHandler<Target>;

  // Touch Events
  onTouchCancel?: TouchEventHandler<Target>;
  onTouchCancelCapture?: TouchEventHandler<Target>;
  onTouchEnd?: TouchEventHandler<Target>;
  onTouchEndCapture?: TouchEventHandler<Target>;
  onTouchMove?: TouchEventHandler<Target>;
  onTouchMoveCapture?: TouchEventHandler<Target>;
  onTouchStart?: TouchEventHandler<Target>;
  onTouchStartCapture?: TouchEventHandler<Target>;

  // Pointer Events
  onPointerOver?: PointerEventHandler<Target>;
  onPointerOverCapture?: PointerEventHandler<Target>;
  onPointerEnter?: PointerEventHandler<Target>;
  onPointerEnterCapture?: PointerEventHandler<Target>;
  onPointerDown?: PointerEventHandler<Target>;
  onPointerDownCapture?: PointerEventHandler<Target>;
  onPointerMove?: PointerEventHandler<Target>;
  onPointerMoveCapture?: PointerEventHandler<Target>;
  onPointerUp?: PointerEventHandler<Target>;
  onPointerUpCapture?: PointerEventHandler<Target>;
  onPointerCancel?: PointerEventHandler<Target>;
  onPointerCancelCapture?: PointerEventHandler<Target>;
  onPointerOut?: PointerEventHandler<Target>;
  onPointerOutCapture?: PointerEventHandler<Target>;
  onPointerLeave?: PointerEventHandler<Target>;
  onPointerLeaveCapture?: PointerEventHandler<Target>;
  onGotPointerCapture?: PointerEventHandler<Target>;
  onGotPointerCaptureCapture?: PointerEventHandler<Target>;
  onLostPointerCapture?: PointerEventHandler<Target>;
  onLostPointerCaptureCapture?: PointerEventHandler<Target>;

  // UI Events
  onScroll?: UIEventHandler<Target>;
  onScrollCapture?: UIEventHandler<Target>;

  // Wheel Events
  onWheel?: WheelEventHandler<Target>;
  onWheelCapture?: WheelEventHandler<Target>;

  // Animation Events
  onAnimationStart?: AnimationEventHandler<Target>;
  onAnimationStartCapture?: AnimationEventHandler<Target>;
  onAnimationEnd?: AnimationEventHandler<Target>;
  onAnimationEndCapture?: AnimationEventHandler<Target>;
  onAnimationIteration?: AnimationEventHandler<Target>;
  onAnimationIterationCapture?: AnimationEventHandler<Target>;

  // Transition Events
  onTransitionEnd?: TransitionEventHandler<Target>;
  onTransitionEndCapture?: TransitionEventHandler<Target>;
}

export interface AriaAttributes {
  /**
   * Identifies the currently active element when
   * DOM focus is on a composite widget, textbox,
   * group, or application.
   */
  'aria-activedescendant'?: string | undefined;
  /**
   * Indicates whether assistive technologies will present all,
   * or only parts of, the changed region based on the change
   * notifications defined by the aria-relevant attribute.
   */
  'aria-atomic'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates whether inputting text could trigger display of
   * one or more predictions of the user's intended value for
   * an input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
  /**
   * Indicates an element is being modified and that assistive
   * technologies MAY want to wait until the modifications are
   * complete before exposing them to the user.
   */
  'aria-busy'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates the current "checked" state of checkboxes, radio
   * buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: number | undefined;
  /**
   * Defines an element's column index or position with respect to
   * the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: number | undefined;
  /**
   * Defines the number of columns spanned by a cell or gridcell
   * within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: number | undefined;
  /**
   * Identifies the element (or elements) whose contents or presence
   * are controlled by the current element.
   * @see aria-owns.
   */
  'aria-controls'?: string | undefined;
  /**
   * Indicates the element that represents the current item within
   * a container or set of related elements.
   */
  'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string | undefined;
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string | undefined;
  /**
   * Indicates that the element is perceivable but disabled,
   * so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string | undefined;
  /**
   * Indicates whether the element, or another grouping element
   * it controls, is currently expanded or collapsed.
   */
  'aria-expanded'?: boolean | 'false' | 'true' | undefined;
  /**
   * Identifies the next element (or elements) in an alternate
   * reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default
   * of reading in document source order.
   */
  'aria-flowto'?: string | undefined;
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates the availability and type of interactive popup element,
   * such as menu or dialog, that can be triggered by an element.
   */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
  /**
   * Indicates keyboard shortcuts that an author has implemented
   * to activate or give focus to an element.
   */
  'aria-keyshortcuts'?: string | undefined;
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string | undefined;
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string | undefined;
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: number | undefined;
  /**
   * Indicates that an element will be updated, and describes the
   * types of updates the user agents, assistive technologies,
   * and user can expect from the live region.
   */
  'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: boolean | 'false' | 'true' | undefined;
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates that the user may select more than one item from
   * the current selectable descendants.
   */
  'aria-multiselectable'?: boolean | 'false' | 'true' | undefined;
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
  /**
   * Identifies an element (or elements) in order to define a visual,
   * functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to
   * represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string | undefined;
  /**
   * Defines a short hint (a word or short phrase) intended to
   * aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of
   * the expected format.
   */
  'aria-placeholder'?: string | undefined;
  /**
   * Defines an element's number or position in the current
   * set of listitems or treeitems. Not required if all elements
   * in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: number | undefined;
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: boolean | 'false' | 'true' | undefined;
  /**
   * Indicates what notifications the user agent will trigger
   * when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined;
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: boolean | 'false' | 'true' | undefined;
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string | undefined;
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: number | undefined;
  /**
   * Defines an element's row index or position with respect
   * to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: number | undefined;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: number | undefined;
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: boolean | 'false' | 'true' | undefined;
  /**
   * Defines the number of items in the current set of listitems
   * or treeitems. Not required if all elements in the set are
   * present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: number | undefined;
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: number | undefined;
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: number | undefined;
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: number | undefined;
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string | undefined;
}

// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
export type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem'
  // | (string & {});
  | string;

export type DOMFactory<P extends DOMAttributes<T>, T extends Element> =
  (props?: RefAttributes<T> & P | null, ...children: VNode[]) => VElement;
