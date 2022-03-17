import { Range } from "@codemirror/rangeset";
import { EditorState, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from "@codemirror/view";
import { Plugin } from "obsidian";

export default class WidgetTest extends Plugin {
  async onload() {
    console.log("loading Widget test");
    this.registerEditorExtension([
      getExtension((from, to) =>
        Decoration.widget({ widget: new OtherWidget(), side: 1 }).range(to),
      ),
      getExtension((from, to) =>
        Decoration.widget({ widget: new FrontWidget(), side: -1 }).range(from),
      ),
      getExtension((from, to) =>
        toggle++ % 2 === 0
          ? Decoration.widget({ widget: new ImageWidget(), side: 1 }).range(to)
          : Decoration.replace({ widget: new ImageWidget(), side: 1 }).range(
              from,
              to,
            ),
      ),
    ]);
  }
}

let toggle = 0;
const keyword = /widget/g;

const getExtension = (
  getDeco: (from: number, to: number) => Range<Decoration>,
) => {
  const createDecoFromState = (state: EditorState): DecorationSet => {
    let decos: ReturnType<Decoration["range"]>[] = [];
    let matches = state.sliceDoc().matchAll(keyword);
    for (const match of matches) {
      let from = match.index!,
        to = from + match[0].length;
      decos.push(getDeco(from, to));
    }
    return Decoration.set(decos);
  };
  return StateField.define<DecorationSet>({
    create: createDecoFromState,
    update: (players, tr): DecorationSet => {
      if (!tr.docChanged) return players;
      return createDecoFromState(tr.state);
    },
    provide: (field) => EditorView.decorations.from(field),
  });
};

let widgetId = -1;
class OtherWidget extends WidgetType {
  updateDOM(_dom: HTMLElement): boolean {
    return true;
  }
  toDOM(view: EditorView): HTMLElement {
    let span = document.createElement("span");
    span.textContent = String(++widgetId);
    return span;
  }
}

let frontWidgetId = -1;
class FrontWidget extends WidgetType {
  updateDOM(_dom: HTMLElement): boolean {
    return true;
  }
  toDOM(view: EditorView): HTMLElement {
    let span = document.createElement("span");
    span.textContent = String(++frontWidgetId);
    return span;
  }
}

let imgwidgetId = -1;

class ImageWidget extends WidgetType {
  updateDOM(_dom: HTMLElement): boolean {
    return true;
  }
  toDOM(view: EditorView): HTMLElement {
    let span = document.createElement("div");
    span.textContent = String(++imgwidgetId) + "Image";
    return span;
  }
}
