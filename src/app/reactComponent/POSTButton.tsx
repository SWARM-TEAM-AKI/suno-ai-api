"use client"

import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import styles from "./POSTButton.module.scss"
import {VoiceChanger} from "./VoiceChanger"
import Swal from 'sweetalert2';

type musicData = {
    audio_url: string
    title: string
}

export function POSTButton() {
    const [prompt, setPrompt] = useState<string>('')
    const [music, setMusic] = useState<musicData[]>([])
    const [createFlg, setCreateFlg] = useState(false)

    const generateMusic = async () => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait while we generate your music.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            setCreateFlg(true)
            const res = await axios.post<AxiosResponse>("/api/generate", {
                "prompt": prompt,
                "make_instrumental": false,
                "wait_audio": true
            }, {
                withCredentials: true
            })
            const musicId = res.data[0].id
            const getMusicFromId: any[] = await axios.get(`/api/get?id=${musicId}`, {withCredentials: true}).then(res => res.data)
            const filteredMusic = getMusicFromId.filter(music => music.audio_url !== "")
            const tempMusic: musicData[] = filteredMusic.map(elm => {
                return {
                    audio_url: elm.audio_url,
                    title: elm.title
                }
            })
            setMusic(tempMusic)
            setCreateFlg(false)
        } catch (error) {
            console.error(error);
        } finally {
            Swal.close();
        }
    }

    const handleOnClick = async () => {
        await generateMusic()
    }


    const handleNoPostClick = async () => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait while we generate your music.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const getMusicFromId = await axios.get<AxiosResponse<any[]>>("/api/get").then(elm => elm.data);
            const tempMusic: musicData[] = getMusicFromId.map(elm => {
                return {
                    audio_url: elm.audio_url,
                    title: elm.title
                }
            })
            setMusic(tempMusic)
        } catch (error) {
            console.error(error);
        } finally {
            Swal.close();
        }
    }

    return (
        <div className={styles.postButtonArea}>
            <br/>
            <button className={styles.postButton} onClick={handleOnClick}>CREATE MUSIC</button>
            <div className={styles.textArea}>
                <label>prompt(200文字以内):</label>
                <textarea placeholder={"テキストを入力してください"} onChange={(e) => {
                    setPrompt(e.target.value)
                }}></textarea>

            </div>
            <div className={styles.musicArea}>
                {!createFlg && music.map((eachData, index) => {
                    return (
                        <div key={index}>
                            <a href={eachData.audio_url} rel="noopener noreferrer"
                               target="_blank">{`${index + 1} : ${eachData.title}`}</a>
                        </div>)
                })}

            </div>

            <br/>
            <button onClick={handleNoPostClick}>GETオンリー</button>
            <br/>
            <div>
                {/*<h1>バイソンの道</h1>*/}
                {/*<audio controls>*/}
                {/*    <source src="https://cdn1.suno.ai/169913d8-57b3-4822-86b1-91c075505c3e.mp3" type="audio/mpeg"/>*/}
                {/*    バイソンの道*/}
                {/*</audio>*/}
                <h1>Highway drea, base</h1>
                <audio controls>
                    <source src="https://cdn1.suno.ai/bb372f89-56f8-4540-b348-a458c9c0c65e.mp3#t=6" type="audio/mpeg"/>
                </audio>
                <p> I drive on the highway every morning for my commute. I'm getting tired of the unchanging scenery
                    every day, and sometimes the traffic jams add to my stress. Create a song that will lift my
                    spirits.</p>
                <br/>

                <h1>Highway drea, speedUp</h1>
                <audio controls>
                    <source src="https://cdn1.suno.ai/a0fa4d70-6e6a-41c4-8e35-e62d4d90c08b.mp3#t=20" type="audio/mpeg"/>
                </audio>
                <p> I drive on the highway every morning for my commute. I'm getting tired of the unchanging scenery
                    every day, and sometimes the traffic jams add to my stress. Create a song that will lift my
                    spirits.</p>
                <br/>

                <h1>Highway drea, rainy</h1>
                <audio controls>
                    <source src="https://cdn1.suno.ai/cb44e666-1694-456b-a426-026eaca860e8.mp3#t=10" type="audio/mpeg"/>
                </audio>
                <p>It started raining. Please change the tune to a slow ballad that suits this situation.
                </p>
                <br/>

                <h1>Highway drea, eco-mode</h1>
                <audio controls>
                    <source src="https://cdn1.suno.ai/5e50ad02-1af0-4a55-b287-3089a46f26ae.mp3#t=24" type="audio/mpeg"/>
                </audio>
                <p>i chose economy driving mode. please change current musit to a relax one.
                </p>
                <br/>

            </div>
            <br/>
            <VoiceChanger/>

        </div>
    )
}

const idList = [
    "6bdd0814-433f-43e4-9849-3f387b5dfae1",
    "57a5dfd2-ea58-44c6-9a2c-5b99f0aa7cf2",
    "191d62e4-2a40-4cfc-9f02-e0e1a7d8f182",
    "d2b02967-fb0b-4a07-a080-2d2af8972b31",
    "4e806161-aa45-41e4-913d-2467b3a1cba9",
    "5c2c85fe-041c-4e37-9109-388a6ba3f57e",
    "f00484b6-f932-4748-9ba2-2cc86943d914",
    "fba6aced-ba3e-4aaf-b28e-93a448bb5004"
]