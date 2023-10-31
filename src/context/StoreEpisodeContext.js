import {createContext, useContext, useEffect, useState} from "react";
import {useOpenAiContext} from "./OpenAiContext";
import axios from "axios";

const StoreEpisodeContext = createContext();

const StoreEpisodeProvider = ({ children }) => {

    const [imageStatus, setImageStatus] = useState('initial');
    const [imageReload, setImageReload] = useState(false)
    const [imageSrc, setImageSrc] = useState('');
    const [imageXid, setImageXid] = useState(null)

    const [availableVoices, setAvailableVoices] = useState([]);
    const [voicesError, setVoicesError] = useState(null);
    const [selectedVoices, setSelectedVoices] = useState([])


    const {selectedArticle, setSelectedArticle} = useOpenAiContext();

    const [formData, setFormData] = useState({
        gcsUrl: "",
        stage: "student",
        xid: "",
        duration: 0,
        tags: "",
        description: "",
        title: "",
        voice: {
            name: "",
            sex: "male",
            tone: []
        }
    });

    useEffect(() => {
        if (!selectedArticle) return ;
        setFormData(prevState => ({...prevState, title: selectedArticle.title, xid: selectedArticle.xid}))
    }, [selectedArticle])

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/elevenlabs/voices`);
                setAvailableVoices(data);
            } catch (error) {
                console.error('Failed to fetch voices:', error);
                setVoicesError(error.message)
            }
        };

        fetchVoices();
    }, []);

    return (
        <StoreEpisodeContext.Provider
            value={{
                formData, setFormData,
                imageStatus, setImageStatus,
                imageReload, setImageReload,
                imageSrc, setImageSrc,
                imageXid, setImageXid,
                availableVoices, setAvailableVoices,
                voicesError, setVoicesError,
                selectedVoices, setSelectedVoices
            }}
        >
            {children}
        </StoreEpisodeContext.Provider>
    )
}

const useStoreEpisodeContext = () => {
    const context = useContext(StoreEpisodeContext);
    if (context === undefined) {
        throw new Error('useStoreEpisodeContext must be used within an StoreEpisodeProvider');
    }
    return context;
}

export {StoreEpisodeProvider, useStoreEpisodeContext}
