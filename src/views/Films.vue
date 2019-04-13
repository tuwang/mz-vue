<template>
  <div class="film-list">
    <Bananer :banners="bannerList"></Bananer>
    <div class="tabs-bar-wrapper">
      <div class="tabs-bar">
        <ul class="tabs-nav">
          <li style="width: 50%;"
            v-for="item in filmTypes"
            :key="item.id"
            :class="{ active: curType === item.id }"
            @click="changeType(item)">
            <span>{{ item.name }}</span>
          </li>
          <div
            class="tab-ink-bar-wrapper"
            :style="tabInkBarStyle">
            <span class="tab-ink-bar" style="width: 56px;"></span>
          </div>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bananer from '../components/Bananer';
import axios from 'axios';
export default {
  data() {
    return {
      bannerList: [],
      filmTypes: [
        { id:'nowPlaying', name:'正在热映', href: '/films/nowPlaying' },
        { id:'comingSoon', name:'即将上映', href: '/films/comingSoon' }
      ],
      curType: this.$route.path.substring(7)
    }
  },

  computed: {
    tabInkBarStyle () {
      let obj = {
        transform: 'translate3d(0%, 0px, 0px)',
        width: '50%'
      }
      if (this.curType === 'comingSoon') {
        obj.transform = 'translate3d(100%, 0px, 0px)'
      }
      return obj
    }
  },

  components: {
    Bananer
  },
  methods: {
    /** 
     * 请求轮播图的数据
     * */ 
    getBannerList() {
      axios.get('https://m.maizuo.com/gateway?type=2&cityId=440300&k=3684551', {
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"15546272691911260447363"}',
          'X-Host': 'mall.cfg.common-banner'
        }
      }).then(res => {
        let data = res.data;
        if(data.status === 0){
          this.bannerList = data.data;
        }else {
          alert(data.msg);
        }
      })
    },
    /** 
     * 切换影片类型
     * @param {object} item 当前需要切换的类型对象
    */
    changeType (item) {
      this.curType = item.id
      this.$router.replace(item.href)
    }
  },

  created() {
    this.getBannerList();
  }
}
</script>

<style lang="less">
@import '../styles/common/mixins.less';

.film-list {
  padding-bottom: 50px;
  .city-fixed {
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0,0,0,.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;

    i {
      font-size: 10px;
    }
  }

  .film-list-content {
    ul {
      margin-left: 15px;

      li {
        .border-1-bottom;
        padding: 15px 15px 15px 0;
        height: 94px;
        position: relative;
        box-sizing: content-box;

        > a {
          display: flex;
          align-items: center;
        }

        .img {
          flex-shrink: 0;
          width: 66px;
          height: 94px;
          background: rgb(249, 249, 249);
          img {
            width: 100%;
            border-radius: 2px;
          }
        }

        .info {
          flex: 1;
          padding: 0 10px;
          overflow: hidden;

          .info-col {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }

          .film-name {
            .name {
              max-width: calc(100% - 25px);
              color: #191a1b;
              font-size: 16px;
              height: 22px;
              line-height: 22px;
              margin-right: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .item {
              font-size: 9px;
              color: #fff;
              background-color: #d2d6dc;
              height: 14px;
              line-height: 14px;
              padding: 0 2px;
              border-radius: 2px;
            }
          }

          .film-grade {
            .label {
              font-size: 13px;
              margin-top: 4px;
              color: #797d82;
            }
            .grade {
              color: #ffb232;
              font-size: 14px;
            }
          }

          .film-actors {
            .label {
              font-size: 13px;
              margin-top: 4px;
              color: #797d82;
            }
          }

          .film-detail {
            .label {
              font-size: 13px;
              margin-top: 4px;
              color: #797d82;
            }
          }
        }

        .buy {
          .border-1;
          flex-shrink: 0;
          line-height: 25px;
          height: 25px;
          width: 50px;
          color: #ff5f16;
          font-size: 13px;
          text-align: center;
          border-radius: 2px;
          position: relative;
        }
      }
    }
  }
}


.tabs-bar-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  overflow-x: hidden;
  background: #fff;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  .tabs-bar {
    .border-1-bottom;
    height: 49px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    transition: transform .2s cubic-bezier(.35,0,.25,1);
    position: relative;

    .tabs-nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;

      li {
        flex-shrink: 0;
        color: #191a1b;
        text-align: center;
        height: 16px;
        line-height: 16px;
        font-size: 14px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0,0,0,0);

        &.active {
          color: #ff5f16;
        }
      }

      .tab-ink-bar-wrapper {
        position: absolute;
        margin: auto;
        top: 30px;
        left: 0;
        transform: translateZ(0);
        transition: transform .2s cubic-bezier(.35,0,.25,1);

        .tab-ink-bar {
          border-bottom: 2px solid #ff5f16;
          border-radius: 20px;
          display: block;
          margin: auto;
        }
      }
    }
  }
}

</style>

