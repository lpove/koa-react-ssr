//src/client/pages/index/index.js
//index 组件
import './index.scss';
import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import RootContext from '../../app/root-context';
import tempData from './data';
import Title from '../../common/components/Title';
import { Helmet } from 'react-helmet';



//组件
class Index extends React.Component {
    constructor(props,context) {
        super(props,context);
        //数据通过 context 传递到组件里
        this.state={
            page:context.page||{},
            fetchData:context.fetchData
        }
    }


    //得到 context 对象
    static contextType = RootContext;

    static async  getInitialProps() {
        console.log('fetch data');
        //模拟数据请求方法
        const fetchData=()=>{
            return new Promise(resolve=>{
                setTimeout(() => {
                    resolve({
                        code:0,
                        data: tempData
                    })
                }, 100);
            })
        }

        let res = await fetchData();

        return {
            fetchData:res,
            page:{
                tdk:{
                    title:'首页',
                    keywords:'前端技术江湖',
                    description:'前端技术江湖'
                }
            }
        }
    }

    componentDidMount(){
        if (!this.state.fetchData){
            //如果没有数据，则进行数据请求
            Index.getInitialProps().then(res=>{
                this.setState({
                    fetchData:res.fetchData,
                    page:res.page
                });

                let { tdk } = this.state.page;
                if (tdk) {
                    document.title = tdk.title;
                }

            })
        }
       
      
    }

    render() {
        //渲染数据

        const {code,data}=this.state.fetchData||{};
        
        return <div className="index-content">
            <Title></Title>
            <p className="img"></p>
        {data && data.map((item,index)=>{
            return <div className="item" key={index}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>
        })}
        {!data&&<div>暂无数据</div>}
        </div>
    }
}

export default Index;
