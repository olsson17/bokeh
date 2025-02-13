import {Column, ColumnView} from "./column"
import * as p from "core/properties"

export class WidgetBoxView extends ColumnView {
  override model: WidgetBox
}

export namespace WidgetBox {
  export type Attrs = p.AttrsOf<Props>

  export type Props = Column.Props
}

export interface WidgetBox extends Column.Attrs {}

export class WidgetBox extends Column {
  override properties: WidgetBox.Props
  override __view_type__: WidgetBoxView

  constructor(attrs?: Partial<WidgetBox.Attrs>) {
    super(attrs)
  }

  static {
    this.prototype.default_view = WidgetBoxView
  }
}
