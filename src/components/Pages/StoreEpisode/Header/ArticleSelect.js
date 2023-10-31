import {Box, Column, Columns, FormFieldGroup, Inline, PictogramButton, Stack, Text} from "@amboss/design-system";
import {ArticleSelect as CommonArticleSelect} from "../../../Commons/ArticleSelect";
import React from "react";
import {useOpenAiContext} from "../../../../context/OpenAiContext";

export const ArticleSelect = ({activeTab, setActiveTab}) => {

    const { openAiLoading, selectedArticle } = useOpenAiContext();

    return (
        <Columns alwaysFillSpace={false}>
            <Column alignSelf={"start"} size={["12","12","12"]}>
                {
                    activeTab === 0
                        ? <CommonArticleSelect disabled={activeTab} />
                        : (
                            <div className={"article-selector__readonly-form"}>
                                <FormFieldGroup label={"Selected Article"}>
                                    <Inline>
                                        <Stack space={["xxs"]}>
                                            <Box space={"xs"} lspace={"m"}>
                                                <Text weight={"bold"} size={"m"} as={"span"} >
                                                    {selectedArticle.title}
                                                </Text>
                                                {
                                                    activeTab < 2 && (
                                                        <PictogramButton
                                                            ariaAttributes={{
                                                                'aria-label': 'Change Article'
                                                            }}
                                                            icon="edit-3"
                                                            disabled={ activeTab>1 || openAiLoading }
                                                            onBlur={function noRefCheck(){}}
                                                            onClick={() => setActiveTab(0)}
                                                            onFocus={function noRefCheck(){}}
                                                            size="l"
                                                            type="button"
                                                            variant="tertiary"
                                                        />
                                                    )
                                                }
                                            </Box>
                                            <Text size={"xs"}>
                                                XID: {selectedArticle.xid}
                                            </Text>
                                        </Stack>
                                    </Inline>
                                </FormFieldGroup>
                            </div>
                        )
                }

            </Column>
        </Columns>
    )

}

