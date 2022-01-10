import ElementItem from "./element";
import {parsePx} from "@/utils";

export default {
  name: 'Preview',
  props: ['elements', 'height'],
  methods: {
    genEventHandlers (element) {
      const Ctor = this.$options.components[`${element.name}_${element.uuid}`]
      return element.getEventHandlers(Ctor)
    }
  },
  render() {
    this.$createElement()
    const userAgent = navigator.userAgent;
    let isRem = false;
    if (!!userAgent.match(/AppleWebKit.*Mobile.*/)||userAgent.indexOf('iPad') > -1) {
      isRem = true
    }
    let height = '100%';
    if (this.height) {
      height = parsePx(this.height, isRem);
    }
    const pageWrapperStyle = {height: height, position: 'relative'}
    return (
      <div style={pageWrapperStyle}>
        {
          this.elements.map((el) => {
            const { top, left, width, height, position } = el.getStyle({position: 'absolute'})
            const zIndex = el.getStyle({position: 'absolute'})['z-index']
            return (
              <ElementItem element={el} style={{top, left, width, height, position, 'z-index': zIndex}}>
                {
                  this.$createElement(el.uuid,
                    {
                      ...el.getPreviewData()
                    }
                  )
                }
              </ElementItem>
            )
          })
        }
      </div>
    )
  }
}
