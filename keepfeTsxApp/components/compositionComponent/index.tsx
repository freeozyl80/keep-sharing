import * as vca from "vue-tsx-support/dist/esm/vca";

const IndexComponent = vca.component({
  name: "IndexComponent",
   props: {
    msg: { type: String, required: true }
  },
  setup(p) {
    return () => (
      <div>
        <span>{ p.msg }</span>
      </div>
    )
  }
});

export default IndexComponent