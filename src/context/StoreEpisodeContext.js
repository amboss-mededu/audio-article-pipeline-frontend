import {createContext, useContext, useEffect, useState} from "react";
import {useOpenAiContext} from "./OpenAiContext";

const StoreEpisodeContext = createContext();

const StoreEpisodeProvider = ({ children }) => {

    const [imageStatus, setImageStatus] = useState('initial');
    const [imageReload, setImageReload] = useState(false)
    const [imageSrc, setImageSrc] = useState('');
    const [imageXid, setImageXid] = useState(null)

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
        console.log("Setting: ", selectedArticle);
        console.log("Form: ", formData);
    }, [selectedArticle, setFormData])

    return (
        <StoreEpisodeContext.Provider
            value={{
                formData, setFormData,
                imageStatus, setImageStatus,
                imageReload, setImageReload,
                imageSrc, setImageSrc,
                imageXid, setImageXid
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
