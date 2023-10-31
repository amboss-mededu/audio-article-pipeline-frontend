import {Card, Stack, CardBox, Text, Divider, PictogramButton, Inline, Tooltip} from "@amboss/design-system";
import {Popover} from "@mui/material";

export const SuccessCard = ({ episodes = [] }) => {

    const Episode = ({voice}) => {

        if (!voice || typeof voice !== "object") return ;

        return (
            <Inline>
                <Text weight="bold">
                    {voice.name}
                </Text>
                { voice.tone.length
                    ? (
                        <Tooltip  content={voice.tone.join(", ")}>
                            <Text>
                                ({voice.sex})
                            </Text>
                        </Tooltip>
                    )
                    : <Text>({voice.sex})</Text>
                }
            </Inline>
        )
    }

    return (
        <Card
            overflow="visible"
            title={episodes[0].title}
        >
            {episodes.map((episode, index) => (
                <Stack space="zero" key={index}>
                    <CardBox key={index}>
                        <Inline alignItems={"spaceBetween"}>
                            <Episode voice={episode.voice} />
                            <PictogramButton
                                ariaAttributes={{ 'aria-label': 'Download' }}
                                icon="download"
                                onClick={async () => {
                                    const apiUrl = episode.signedGcsUrl;  // use your own API call logic if needed
                                    window.open(apiUrl, '_blank');
                                }}
                                size="xs"
                                type="button"
                                variant="tertiary"
                            />
                        </Inline>
                    </CardBox>
                    <Divider />
                </Stack>
            ))}
        </Card>
    )
}
