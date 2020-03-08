<template>
  <el-container class="container">
    <el-main>
      <el-row class="row">
        <el-col :span="24">
          <div class="title">Machine Translation</div>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="row">
        <el-col :xs="8" :sm="6" :md="6" :lg="4">
          <el-select v-model="model" placeholder="Select Model">
            <el-option
              v-for="item in modelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="7" :sm="4" :md="4" :lg="4">
          <el-select v-model="srcLang" placeholder="Source">
            <el-option
              v-for="item in srcOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="1" :lg="1" class="icon">
          <i @click="switchLang" class="fa fa-exchange" aria-hidden="true"></i>
        </el-col>
        <el-col :xs="7" :sm="4" :md="4" :lg="4">
          <el-select v-model="tgtLang" placeholder="Target">
            <el-option
              v-for="item in tgtOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4">
          <el-button @click="translate"
            type="primary" style="width: 100%">{{translateBtn}}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 20}"
            maxlength="500"
            show-word-limit
            v-model="srcText"
            :placeholder="srcPlaceholder"></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 20}"
            :disabled="true"
            v-model="tgtText"
            placeholder=""></el-input>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Translate',
  data() {
    return {
      modelOptions: [{
        value: 'mass',
        label: 'MASS',
      }, {
        value: 'fconv',
        label: 'FCONV',
      }],
      model: 'mass',
      srcOptions: [{
        value: 'en',
        label: 'English',
      }, {
        value: 'zh',
        label: '中文',
      }],
      srcLang: null,
      tgtOptions: [{
        value: 'zh',
        label: '中文',
      }, {
        value: 'en',
        label: 'English',
      }],
      tgtLang: null,
      srcText: null,
      tgtText: null,
    };
  },
  computed: {
    translateBtn() {
      return this.srcLang === 'zh' ? '翻译' : 'Translate';
    },
    srcPlaceholder() {
      return this.srcLang === 'zh' ? '请输入内容' : 'Please input source text';
    },
  },
  watch: {
    srcLang(val) {
      if (val === 'en') {
        this.tgtLang = 'zh';
      } else if (val === 'zh') {
        this.tgtLang = 'en';
      }
    },
    tgtLang(val) {
      if (val === 'en') {
        this.srcLang = 'zh';
      } else if (val === 'zh') {
        this.srcLang = 'en';
      }
    },
    srcText(val) {
      if (val === null || val === '') {
        this.tgtText = null;
      }
    },
  },
  methods: {
    switchLang() {
      if (this.srcLang === 'en') {
        this.srcLang = 'zh';
      } else if (this.srcLang === 'zh') {
        this.srcLang = 'en';
      }
    },
    translate() {
      if (this.srcText === null || this.srcText === '') {
        return;
      }
      const params = {
        s_lang: this.srcLang,
        t_lang: this.tgtLang,
        s_text: this.srcText,
      };
      let url = 'http://3.12.13.227';
      if (this.model === 'mass') {
        url = '/mass/translate';
        // url += ':4869/translate';
      } else if (this.model === 'fconv') {
        url = '/fconv/translate';
        // url += ':4870/translate';
      }
      axios.post(url, params)
        .then((res) => {
          if (res.status === 200) {
            this.tgtText = res.data.t_text;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
  .container {
    margin: auto;
    @media screen and (min-width: 1080px) {
      width: 60%
    }
  }
  .row {
    margin-top: 10px;
    margin-bottom: 10px;

    .el-col {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .title {
    font-family: "Helvetica Neue";
    font-size: 40px;

    @media screen and (max-width: 435px) {
      font-size: 20px;
    }
  }
  .icon {
    text-align: center;
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
    font-size: 20px;

    i {
      cursor: pointer;
    }
  }
</style>
