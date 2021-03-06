/**
 * Created by chenjunjun 美食
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    ListView,
} from 'react-native' ;

var Dimensions = require('Dimensions');
//取得屏幕宽度
var screenWidth = Dimensions.get('window').width;
//取得美食顶部的数据
var foodViewTopData = require('../../data/foodViewTopData.json');

//引入封装好的图片文组件,并且自带点击事件
var HomeTopItemView = require('../HomeTopItemView');

//每行显示的图片数
var clos = 4;
//包含图片view的宽度
var itemViewHeight = 65;
//水平间距
var hMargin = (screenWidth - clos * itemViewHeight) / (clos + 1);
//垂直间距
var vMargin = 18;

var ToastAndroid = require('ToastAndroid');

//取得中间的分类组件
var CategoryView = require('./CategoryView');

import  ListItemView from './ListItemView' ;

var Food = React.createClass({

    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.getData()),
        };
    },
    getData: function () {
        var dataBlob = [];
        for (let i = 0; i < 20; i++) {
            dataBlob.push("haha" + i);
        }
        return dataBlob;
    },
    render: function () {

        return (
            <View style={styles.container}>
                {this.renderTitleBar()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}>
                    <View style={styles.gridViewStyle}>
                        {this.renderGirdView()}
                    </View>
                    {/**中间分类的布局*/}
                    {this.renderCategoryView()}
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}>
                    </ListView>
                </ScrollView>
            </View>
        );
    },
    renderTitleBar: function () {
        return (
            <View style={styles.titleBarStyle}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=>this.popFood()}>
                    <View style={{width: 30}}>
                        <Image source={{uri: 'food_ic_back_u'}} style={{width: 15, height: 15}}></Image>
                    </View>
                </TouchableOpacity>

                <View style={styles.titleCenterViewStyle}>
                    <TextInput
                        style={styles.titleCenterTextInputStyle}
                        inlineImageLeft="food_ic_search_label"
                        inlineImagePadding={5}
                        placeholder={'输入用户名、地点'}
                    ></TextInput>
                </View>

            </View>
        );
    },
    popFood: function () {
        this.props.navigator.pop();
    },
    /**
     * 渲染美食头部的GridView
     */
    renderGirdView: function () {
        var gridViewDatas = [];
        var foodViewTopDatas = foodViewTopData.imginfo;
        for (var i = 0; i < foodViewTopDatas.length; i++) {
            var title = foodViewTopDatas[i].title;
            var imgRes = foodViewTopDatas[i].icon;
            gridViewDatas.push(
                <View key={i} style={styles.gridItemViewStyle}>
                    <HomeTopItemView
                        renderIcon={{uri: imgRes}}
                        text={title}
                        position={i}
                        onclick={this.omItemClick}
                    />

                </View>
            );
        }
        return gridViewDatas;
    },
    omItemClick: function (text, position) {
        switch (position) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;

        }
        ToastAndroid.show('你点击了 ' + text + ";第" + (position + 1) + " 张图片", ToastAndroid.SHORT);
    },
    /**
     * 渲染分类中间的View
     */
    renderCategoryView: function () {
        return (
            <View style={styles.categoryViewStyle}>
                <CategoryView
                    title="附近"/>
                <CategoryView
                    title="美食"/>
                <CategoryView
                    title="智能排序"/>
                <CategoryView
                    title="筛选"/>
            </View>

        );
    },
    /**
     * 渲染食品条目列表
     * @param rowData
     * @param sectionID
     * @param rowID
     * @param highlightRow
     * @returns {XML}
     */
    renderRow(rowData, sectionID, rowID, highlightRow){
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=> {
                    ToastAndroid.show('你点击了 ' + rowID, ToastAndroid.SHORT)
                }}>
                {this.renderListItemView(rowData, rowID)}
            </TouchableOpacity>
        );
    },
    //渲染每一个条目,如果是第一条的话,那么没有marginTop
    renderListItemView: function (rowData, rowID) {
        if (rowID == 0) {
            return (
                <View>
                    <ListItemView
                        itemRenderIcon="zuliaoanmo"
                        itemLeftTitle='聚宾楼烤鸭'
                        itemCenterTitle='126人'
                        itemBelowCentenTitle='唐洋路'
                        itemAlignRightBelowCenterTitle='北京菜'
                        itemRightKm='1.3km'>
                    </ListItemView>
                </View>
            );
        } else {
            return (
                <View style={{marginTop: 3}}>
                    <ListItemView
                        itemRenderIcon="zuliaoanmo"
                        itemLeftTitle='聚宾楼烤鸭'
                        itemCenterTitle='126人'
                        itemBelowCentenTitle='唐洋路'
                        itemAlignRightBelowCenterTitle='北京菜'
                        itemRightKm='1.3km'>
                    </ListItemView>
                </View>
            );
        }
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd'
    },
    //titleBar样式
    titleBarStyle: {
        height: 47,
        backgroundColor: '#eeeeee',
        borderBottomWidth: 1.5,
        borderBottomColor: '#dddddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: 3,
        paddingRight: 3,

    },
    //为了实现圆角输入框,加了一个圆角view
    titleCenterViewStyle: {
        backgroundColor: 'white',
        height: 32,
        width: screenWidth * 0.87,
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#bbbbbb',
        marginRight: 4
    },
    //目前没有发现TextInput可以设置背景图片,TextInput设置圆角不起作用,所以放在圆角view中并且其背景是透明的完美解决圆角TextInput
    titleCenterTextInputStyle: {
        flex: 1,
        backgroundColor: "#00000000",
        height: 40
    },
    //gridView的样式
    gridViewStyle: {
        backgroundColor: 'white',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 0.8,
        borderBottomColor: '#dddddd'
    },
    //gridView中每个Item的样式
    gridItemViewStyle: {
        width: itemViewHeight,
        height: itemViewHeight,
        marginLeft: hMargin,
        marginTop: vMargin,
        alignItems: 'center'
    },
    categoryViewStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 8,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.8,
        borderBottomColor: '#dddddd'
    }
});

module.exports = Food