import React from 'react';
import { DropDown } from '../../../../common/dropdown';

export default function Filter(props) {

  return (
    <>
      <DropDown
        id={props.watchListId}
        keyTitle="text"
        listKey={props.listMyIndex}
        listDataByKey={props.listMyIndexByKey}
        currentKey={props.currentMyIndex}
        change={props.changeIndex}
        isEditable={true}
        update={props.updateMyIndex}
        deleteAction={props.deleteMyIndex}
      />
      <DropDown
        id={props.watchListId}
        keyTitle="text"
        listKey={props.listDefaultIndex}
        listDataByKey={props.listDefaultIndexByKey}
        currentKey={props.currentDefaultIndex}
        change={props.changeIndex}
        tooltipText = 'watchListSummary.tooltipItemCompanyGroup'/>
      <DropDown
        id={props.watchListId}
        keyTitle="text"
        listKey={props.listIndustry}
        listDataByKey={props.listIndustryByKey}
        currentKey={props.currentIndustry}
        change={props.changeIndex}/>
      <DropDown
        id={props.watchListId}
        keyTitle="name"
        listKey={props.listDerivative}
        listDataByKey={props.listDerivativeByKey}
        currentKey={props.currentDerivative}
        change={props.changeDerivative}/>
      <DropDown
        id={props.watchListId}
        keyTitle="name"
        listKey={props.listPutThrough}
        listDataByKey={props.listPutThroughByKey}
        currentKey={props.currentPutThrough}
        change={props.changePutThrough}/>
    </>
  );
}
