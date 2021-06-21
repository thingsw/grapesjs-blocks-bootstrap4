import Collapse, { CollapseBlock } from './components/Collapse';
import Dropdown, { DropDownBlock } from './components/Dropdown';
import Form, { FormBlock } from './components/Form';
import Input, { InputBlock } from './components/Input';
import InputGroup, { InputGroupBlock } from './components/InputGroup';
import Textarea, { TextareaBlock } from './components/Textarea';
import Select, { SelectBlock } from './components/Select';
import Checkbox, { CheckboxBlock } from './components/Checkbox';
import Radio, { RadioBlock } from './components/Radio';
import AnchorButton, { AnchorButtonBlock } from './components/AnchorButton';
import Button, { ButtonBlock } from './components/Button';
import ButtonGroup, { ButtonGroupBlock } from './components/ButtonGroup';
import ButtonToolbar, { ButtonToolbarBlock } from './components/ButtonToolbar';
import Label, { LabelBlock } from './components/Label';
import Link, { LinkBlock } from './components/Link';
import FileInput, { FileInputBlock } from './components/FileInput';
import Image, { ImageBlock } from './components/Image';
import Paragraph, { ParagraphBlock } from './components/Paragraph';
import Header, { HeaderBlock } from './components/Header';
import Card, { CardBlock } from './components/Card';
import Badge, { BadgeBlock } from './components/Badge';
import Alert, { AlertBlock } from './components/Alert';
import MediaObject, { MediaObjectBlock } from './components/MediaObject';
import ColumnBreak, { ColumnBreakBlock } from './components/ColumnBreak';
import Column, { ColumnBlock } from './components/Column';
import Row, { RowBlock } from './components/Row';
import Container, { ContainerBlock } from './components/Container';
import Text, { TextBlock } from './components/Text';
import Accordion, { AccordionBlock } from './components/Accordion/Accordion';
import AccordionHeading, { AccordionHeadingBlock } from './components/Accordion/AccordionHeading';
import AccordionBody, { AccordionBodyBlock } from './components/Accordion/AccordionBody';
import Table, { TableBlock } from './components/tables/Table';
import TableBody, { TableBodyBlock } from './components/tables/TableBody';
import TableHead, { TableHeadBlock } from './components/tables/TableHead';
import TableRow, { TableRowBlock } from './components/tables/TableRow';
import TableCellHead, { TableCellHeadBlock } from './components/tables/TableCellHead';
import TableCell, { TableCellBlock } from './components/tables/TableCell';
import VerticalTabs, { VerticalTabsBlock } from './components/tab/VerticalTabs';
import Tabs, { TabsBlock } from './components/tab/Tabs';
import TabsNavigation from './components/tab/TabsNavigation';
import Tab, { TabBlock } from './components/tab/Tab';
import TabPanels from './components/tab/TabPanels';
import TabPanel, { TabPanelBlock } from './components/tab/TabPanel';
import Carousel, { CarouselBlock } from './components/carousel/Carousel';
import CarouselIndicators from './components/carousel/CarouselIndicators';
import CarouselIndicator from './components/carousel/CarouselIndicator';
import CarouselInner from './components/carousel/CarouselInner';
import CarouselControl from './components/carousel/CarouselControl';
import CarouselItem, { CarouselItemBlock } from './components/carousel/CarouselItem';
import Video2, { Video2Block } from './components/video2/Video';
import IFrame2, { IFrame2Block } from './components/video2/IFrame2';
import YoutubeThumbnail, { YoutubeThumbnailBlock } from './components/video2/YoutubeThumbnail';
import Modal from './components/modal/Modal';
import YoutubePlayButton from './components/video2/YoutubePlayButton';
import SwiperContainer, { SwiperContainerBlock } from './components/swiper/SwiperContainer';
import SwiperWrapper from './components/swiper/SwiperWrapper';
import SwiperPagination from './components/swiper/SwiperPagination';
import SwiperSlide, { SwiperSlideBlock } from './components/swiper/SwiperSlide';

import Default from './components/Default';

export default (editor, config = {}) => {
  const c = config;
  const domc = editor.DomComponents;
  const { blocks } = c;
  const bm = editor.BlockManager;
  const cats = c.blockCategories;

  const traits = {
    id: {
      name: 'id',
      label: c.labels.trait_id,
    },
    for: {
      name: 'for',
      label: c.labels.trait_for,
    },
    name: {
      name: 'name',
      label: c.labels.trait_name,
    },
    placeholder: {
      name: 'placeholder',
      label: c.labels.trait_placeholder,
    },
    value: {
      name: 'value',
      label: c.labels.trait_value,
    },
    required: {
      type: 'checkbox',
      name: 'required',
      label: c.labels.trait_required,
    },
    checked: {
      label: c.labels.trait_checked,
      type: 'checkbox',
      name: 'checked',
      changeProp: 1,
    },
  };

  if (cats.media) {
    if (blocks.image) {
      ImageBlock(bm, c.labels.image);
      Image(domc);
    }

    if (blocks.youtube_thumb) {
      YoutubeThumbnailBlock(bm, c.labels.youtube_thumb);
      YoutubeThumbnail(domc);
      YoutubePlayButton(domc);
      Modal(domc);
    }

    if (blocks.video2) {
      Video2Block(bm, c.labels.video2);
      Video2(domc);
    }

    if (blocks.iframe2) {
      IFrame2Block(bm, c.labels.iframe2);
      IFrame2(domc);
    }
  }

  // Rebuild the default component and add utility settings to it (border, bg, color, etc)
  if (cats.basic) {
    if (blocks.default) {
      Default(domc);
    }

    // Rebuild the text component and add display utility setting
    if (blocks.text) {
      TextBlock(bm, c.labels.text);
      Text(domc);
    }

    // Rebuild the link component with settings for collapse-control
    if (blocks.link) {
      LinkBlock(bm, c.labels.link);
      Link(editor);
    }

    // Basic
    /* if (blocks.list) {
      ListBlock(bm, c.labels.list)
      List(domc);
    } */

    /* if (blocks.description_list) {
    } */
  }

  // LAYOUT
  if (cats.layout) {
    if (blocks.container) {
      ContainerBlock(bm, c.labels.container);
      Container(domc);
    }
    if (blocks.row) {
      RowBlock(bm, c.labels.row);
      Row(domc);
    }
    if (blocks.column) {
      ColumnBlock(bm, c.labels.column);
      Column(domc, editor);

      ColumnBreakBlock(bm, c.labels.column_break);
      ColumnBreak(domc);
    }
    // Media object
    if (blocks.media_object) {
      MediaObjectBlock(bm, c.labels.media_object);
      MediaObject(domc);
    }
  }

  // Bootstrap COMPONENTS
  if (cats.components) {
    // Alert
    if (blocks.alert) {
      AlertBlock(bm, c.labels.alert);
      Alert(domc);
    }

    if (blocks.accordion) {
      AccordionBlock(bm, c.labels.accordion);
      Accordion(domc);
    }

    if (blocks.accordion_heading) {
      AccordionHeadingBlock(bm, c.labels.accordion_heading);
      AccordionHeading(domc);
    }

    if (blocks.accordion_body) {
      AccordionBodyBlock(bm, c.labels.accordion_body);
      AccordionBody(domc);
    }

    // Badge
    if (blocks.badge) {
      BadgeBlock(bm, c.labels.badge);
      Badge(domc);
    }

    // Card
    if (blocks.card) {
      CardBlock(bm, c);
      Card(domc, editor);
    }

    // Collapse
    if (blocks.collapse) {
      CollapseBlock(bm, c.labels.collapse);
      Collapse(editor);
    }

    // Dropdown
    if (blocks.dropdown) {
      DropDownBlock(bm, c.labels.dropdown);
      Dropdown(editor);
    }
  }

  // TYPOGRAPHY
  if (cats.typography) {
    if (blocks.header) {
      HeaderBlock(bm, c.labels.header);
      Header(domc);
    }
    if (blocks.paragraph) {
      ParagraphBlock(bm, c.labels.paragraph);
      Paragraph(domc);
    }
  }

  if (cats.forms) {
    if (blocks.form) {
      FormBlock(bm, c.labels.form);
      Form(domc, traits, config);
    }

    if (blocks.input) {
      InputBlock(bm, c.labels.input);
      Input(domc, traits, config);

      FileInputBlock(bm, c.labels.file_input);
      FileInput(domc, traits, config);
    }

    if (blocks.form_group_input) {
      InputGroupBlock(bm, c.labels.form_group_input);
      InputGroup(domc, traits, config);
    }

    if (blocks.textarea) {
      TextareaBlock(bm, c.labels.textarea);
      Textarea(domc, traits, config);
    }

    if (blocks.select) {
      SelectBlock(bm, c.labels.select);
      Select(editor, domc, traits, config);
    }

    if (blocks.checkbox) {
      CheckboxBlock(bm, c.labels.checkbox);
      Checkbox(domc, traits, config);
    }

    if (blocks.radio) {
      RadioBlock(bm, c.labels.radio);
      Radio(domc, traits, config);
    }

    if (blocks.label) {
      LabelBlock(bm, c.labels.label);
      Label(domc, traits, config);
    }

    if (blocks.anchor_button) {
      AnchorButtonBlock(bm, c.labels.anchor_button);
      AnchorButton(editor);
    }

    if (blocks.button) {
      ButtonBlock(bm, c.labels.button);
      Button(domc);
    }

    if (blocks.button_group) {
      ButtonGroupBlock(bm, c.labels.button_group);
      ButtonGroup(domc);
    }

    if (blocks.button_toolbar) {
      ButtonToolbarBlock(bm, c.labels.button_toolbar, c);
      ButtonToolbar(domc);
    }
  }

  if (cats.table) {
    if (blocks.table) {
      TableBlock(bm, c.labels.table);
      Table(domc);
    }
    if (blocks.table_body) {
      TableBodyBlock(bm, c.labels.table_body);
      TableBody(domc);
    }
    if (blocks.table_head) {
      TableHeadBlock(bm, c.labels.table_head);
      TableHead(domc);
    }
    if (blocks.table_row) {
      TableRowBlock(bm, c.labels.table_row);
      TableRow(domc);
    }
    if (blocks.table_cell_head) {
      TableCellHeadBlock(bm, c.labels.table_cell_head);
      TableCellHead(domc);
    }
    if (blocks.table_cell) {
      TableCellBlock(bm, c.labels.table_cell);
      TableCell(domc);
    }
  }

  if (cats.tabs) {
    if (blocks.tabs) {
      TabsBlock(bm, c.labels.tabs);
      Tabs(domc);
      VerticalTabsBlock(bm, c.labels.vtabs);
      VerticalTabs(domc);
      TabsNavigation(domc);
      TabBlock(bm, c.labels.tab);
      Tab(domc);
      TabPanels(domc);
      TabPanelBlock(bm, c.labels.tab_pane);
      TabPanel(domc);
    }
  }

  if (cats.carousel) {
    if (blocks.carousel) {
      CarouselBlock(bm, c.labels.carousel);
      Carousel(domc);
      CarouselIndicators(domc);
      CarouselIndicator(domc);
      CarouselInner(domc);
      CarouselItemBlock(bm, c.labels.carousel_item);
      CarouselItem(domc);
      CarouselControl(domc);
    }
  }

  if (cats.swiper) {
    if (blocks.swiper) {
      SwiperContainerBlock(bm, c.labels.swiper_container);
      SwiperContainer(domc);
      SwiperWrapper(domc);
      SwiperPagination(domc);
      SwiperSlideBlock(bm, c.labels.swiper_slide);
      SwiperSlide(domc);
    }
  }
};
