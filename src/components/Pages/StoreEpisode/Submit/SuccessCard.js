import {Card, Stack, CardBox, Text, Divider, PictogramButton, Inline, Tooltip} from "@amboss/design-system";
import {Popover} from "@mui/material";

export const SuccessCard = ({ episodes = [] }) => {
    console.log(episodes);

    return (
        <Card
            overflow="visible"
            title={episodes[0].title}
        >
            {episodes.map((episode, index) => (
                <Stack space="zero">
                    <CardBox key={index}>
                        <Inline alignItems={"spaceBetween"}>
                            <Inline>
                                <Text weight="bold">
                                    {episode.voice.name}
                                </Text>
                                { episode.voice.tone.length
                                    ? (
                                        <Tooltip  content={episode.voice.tone.join(", ")}>
                                            <Text>
                                                ({episode.voice.sex})
                                            </Text>
                                        </Tooltip>
                                    )
                                    : <Text>({episode.voice.sex})</Text>
                                }
                            </Inline>
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
