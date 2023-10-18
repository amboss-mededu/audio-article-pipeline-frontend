import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Select, Box } from "@amboss/design-system";

function CreateEpisodeForm() {
    const [formData, setFormData] = useState({
        gcsUrl: "",
        stage: "student", // default to 'student'
        xid: "",
        duration: 0,
        tags: "",
        description: "",
        title: "",
        voice: {
            name: "",
            sex: "male", // default to 'male'
            tone: []
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/episodes/create', formData);
            console.log(response.data);
            // Handle success - maybe navigate to another page or show a success message
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error - show an error message to the user
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVoiceChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            voice: {
                ...prevState.voice,
                [name]: value
            }
        }));
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Input
                    name="gcsUrl"
                    value={formData.gcsUrl}
                    onChange={handleInputChange}
                    placeholder="GCS URL"
                />
                <Select name="stage" value={formData.stage} onChange={handleInputChange}>
                    <option value="student">Student</option>
                    <option value="physician">Physician</option>
                </Select>
                <Input
                    name="xid"
                    value={formData.xid}
                    onChange={handleInputChange}
                    placeholder="XID"
                />
                <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <Input
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Duration"
                />
                <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Tags (comma separated)"
                />
                <Input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <Input
                    name="name"
                    value={formData.voice.name}
                    onChange={handleVoiceChange}
                    placeholder="Voice Name"
                />
                <Select name="sex" value={formData.voice.sex} onChange={handleVoiceChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Select>
                {/* Add more fields as needed */}
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}

export default CreateEpisodeForm;
