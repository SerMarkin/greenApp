import { Plugins } from '@capacitor/core';
import { Session } from '../models/Session';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';

const { Storage } = Plugins;

const locationsUrl = '/assets/data/locations.json';
const sessionsUrl = '/assets/data/sessions.json';
const speakersUrl = '/assets/data/speakers.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const DATA = 'data';
const scorePaper = 'scorePaper';

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(sessionsUrl),
    fetch(locationsUrl),
    fetch(speakersUrl)]);
  const sessions = await response[0].json() as Session[];
  const locations = await response[1].json() as Location[];
  const speakers = await response[2].json() as Speaker[];
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();
  const data = {
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const getHasSeenTutorialData = async () => {
  return await Storage.get({key:HAS_SEEN_TUTORIAL});
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

export const setUserData = async (data: string) => {
  await Storage.set({ key: DATA, value: data });  
}

export const setScorePaper = async (score: number) => {
  await Storage.set({ key: scorePaper, value: score+"" });  
}
export const getScorePaper = async () => {
  const t = (await Storage.get({ key: scorePaper })).value
  if (!t) return "0";
  return t;  
}
