<template>
  <div v-if="editingElement" class="box-model">
    <div v-if="boxModelPart" class="prompt">设置 {{ boxModelPart }}</div>
    <div v-else>选择 margin/border/padding 进行设置</div>
    <PositionCheckbox label="上" label-key="top" />
    <div class="middle">
      <PositionCheckbox label="左" label-key="left" />
      <div ref="margin" class="margin" data-type="margin" :class="{'margin-select':boxModelPart === 'margin'}" @click="onBoxModelClick">
        margin
        <div ref="border" class="border" data-type="border" :class="{'border-select':boxModelPart === 'border'}">
          border
          <div ref="padding" class="padding" data-type="padding" :class="{'padding-select':boxModelPart === 'padding'}">
            padding
            <div class="content"  data-type="padding">
              {{ commonStyle.width | digit }} x {{ commonStyle.height | digit }}
            </div>
          </div>
        </div>
      </div>
      <PositionCheckbox label="右" label-key="right" />
    </div>
    <PositionCheckbox label="下" label-key="bottom" />
    <div v-if="isEditingBorder" style="display: flex">
      <div style="line-height: 32px;display: flex;margin-right: 4px;">
        <span>边框颜色：</span>
        <el-color-picker size="mini" :value="borderColor" @change="onColorChange"/>
      </div>
      <div style="line-height: 32px;display: flex;flex: 1">
        <span>边框样式：</span>
        <el-select :value="borderStyle" style="flex: 1" @change="onStyleChange" size="mini" >
          <el-option v-for="(item,index) in borderStyleOptions" :key="index" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </div>
    </div>
    <div v-if="isEditingBorder" style="display: flex;line-height: 32px;">
      <span>圆角：</span>
      <el-input
        v-for="(item, index) in borderRadius"
        :key="index"
        :value="item"
        type="number"
        size="mini"
        style="width:60px"
        :min="0"
        @input="(e) => { onRadiusChange(e, index) }"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import PositionCheckbox from './position-checkbox'

  export default {
    name: 'BoxModelEditor',
    components: {
      PositionCheckbox
    },
    data: ()=>({
      borderStyleOptions: [
        {
          label: '无',
          value: 'none'
        },
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '双线',
          value: 'double'
        },
        {
          label: '虚线',
          value: 'dashed'
        },
        {
          label: '点状边框',
          value: 'dotted'
        },
        {
          label: '3D 凹槽边框',
          value: 'groove'
        },
      ]
    }),
    computed: {
      ...mapState('editor', {
        editingElement: state => state.editingElement
      }),
      // margin/padding/border
      boxModelPart () {
        return this.editingElement?.commonStyle.boxModelPart
      },
      commonStyle () {
        return this.editingElement?.commonStyle || {}
      },
      borderColor () {
        return this.commonStyle?.border.color.value || ''
      },
      borderStyle () {
        return this.commonStyle?.border.style.value || ''
      },
      borderRadius () {
        return this.commonStyle?.border.radius || []
      },
      isEditingBorder () {
        return this.boxModelPart === 'border'
      }
    },
    filters: {
      digit (val) {
        return val.toFixed(0)
      }
    },
    methods: {
      ...mapActions('editor', [
        'setElementPosition'
      ]),
      onBoxModelClick (e) {
        const type = e.target.dataset.type
        this.setElementPosition({
          boxModelPart: type
        })
      },
      onStyleChange(style) {
        const boxModelPart = this.boxModelPart
        const boxModelPartStyle = this.editingElement.commonStyle[boxModelPart]
        Object.assign(boxModelPartStyle.style, { value: style })
        this.setElementPosition({ [boxModelPart]: boxModelPartStyle })
      },
      onRadiusChange(radius, index) {
        console.log(radius);
        const boxModelPart = this.boxModelPart
        const boxModelPartStyle = this.editingElement.commonStyle[boxModelPart]
        boxModelPartStyle.radius[index] = radius
        this.setElementPosition({ [boxModelPart]: boxModelPartStyle })
      },
      onColorChange (color) {
        const boxModelPart = this.boxModelPart
        const boxModelPartStyle = this.editingElement.commonStyle[boxModelPart]
        Object.assign(boxModelPartStyle.color, { value: color })
        if (boxModelPart === 'border') {
          this.editingElement.pluginProps.borderColor = color
        }
        this.setElementPosition({ [boxModelPart]: boxModelPartStyle })
      }
    }
  }
</script>

<style lang='less' scoped>
  .box-model {
    margin: 8px 0;
  }
  .inline-block{
    display:inline-block;
    text-align: center;
  }
  .common{
    .inline-block();
    background-color:#52527e;
    &-select{
      background-color: #fedd9b;
    }
  }
  .middle{
    margin:12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .margin{
    width:150px;
    height: 110px;
    border:1px dashed #fff;
    color: #fff;
    font-size:12px;
    flex-shrink: 0;
    .common()
  }
  .border{
    width:120px;
    height: 80px;
    border:1px solid #fff;
    .common()
  }
  .padding{
    border:1px dashed #fff;
    width:90px;
    height: 50px;
    .common()
  }
  .content{
    border: 1px solid #fff;
    background-color: rgb(82, 82, 126);
    width:80%;
    .inline-block()
  }
</style>
