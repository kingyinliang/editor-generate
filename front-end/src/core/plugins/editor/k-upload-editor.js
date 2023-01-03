import Http from '@/utils/axios'

export default {
  name: 'k-upload-editor',
  props: {
    value: String,
    default: '',
  },
  data: ()=>({
  }),
  mounted(){
    this.$refs.imgUpload && this.$refs.imgUpload.clearFiles();
  },
  methods: {
    httpRequest(options){
      const file = options.file;
      const formData = new FormData()
      formData.append('file', file)
      Http.post('/upload/picture', formData).then(({ data }) => {
        options.onSuccess(data.data);
      }).catch(({ data }) => {
        options.onError(data.msg)
      })
    },
    success(res){
      this.$emit('change', res.url)
      this.$refs.imgUpload.clearFiles();
    },
    removeFile(){
      this.$refs.imgUpload.clearFiles();
      this.$emit('change', '')
    }
  },
  render(){
    return (
      <div>
        <div v-show={this.value} class='k-upload' onClick={this.removeFile}>
          <div class='el-upload'>
            <img src={this.value} alt=""/>
            <div class="k-upload_del">
              <em class="el-icon-delete"/>
            </div>
          </div>
        </div>
        <el-upload
          v-show={!this.value}
          ref={'imgUpload'}
          class='k-upload'
          action={''}
          limit={1}
          ShowFileList={false}
          HttpRequest={options => this.httpRequest(options)}
          OnSuccess={res => this.success(res)}
        >
          <em class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </div>
    )
  }
}
