import {createContext, useContext, useState} from "react";

const StoreEpisodeContext = createContext();

const StoreEpisodeProvider = ({ children }) => {
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

    return (
        <StoreEpisodeContext.Provider
            value={{
                formData, setFormData
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
