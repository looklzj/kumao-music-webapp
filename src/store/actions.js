import * as types from './mutation-types';
import {playMode} from '../common/js/config'
import {upset} from '../common/js/tool'
import {saveFavorite,deleteFavorite} from '../common/js/cache';

function findIndex(list, song) {
    return list.findIndex((item) => {
      return item.id === song.id
    })
  }

export const selectPlay=function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const insertSong = function ({commit, state}, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    
    let currentSong = playlist[currentIndex]
    let fpIndex = findIndex(playlist, song)
    currentIndex++
    playlist.splice(currentIndex, 0, song)
    if (fpIndex > -1) {
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }
  
    let currentSIndex = findIndex(sequenceList, currentSong) + 1
  
    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      } else {
        sequenceList.splice(fsIndex + 1, 1)
      }
    }
    console.log(playlist);
    console.log(sequenceList);
    console.log(currentIndex);
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  }

export const deleteSong=function ({commit,state},song){
  let playlist = state.playlist.slice();
  let sequenceList=state.sequenceList.slice();
  let currentIndex=state.currentIndex;
  let pIndex=findIndex(playlist,song);
  playlist.splice(pIndex,1);
  let sIndex=findIndex(sequenceList,song);
  sequenceList.splice(sIndex,1);

  if(currentIndex>pIndex||currentIndex===playlist.length){
    currentIndex--;
  }

  commit(types.SET_PLAYLIST,playlist);
  commit(types.SET_SEQUENCE_LIST,sequenceList);
  commit(types.SET_CURRENT_INDEX,currentIndex);

  if(!playlist.length){
    commit(types.SET_PLAYING_STATE,false);
  }else{
    commit(types.SET_PLAYING_STATE,true);
  }
}

export const saveFavoriteList=function({commit},song){
    commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

export const deleteFavoriteList=function({commit},song){
    commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}