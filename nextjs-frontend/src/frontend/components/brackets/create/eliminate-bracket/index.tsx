import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { FieldArray, FormikProvider, useFormik } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "../../../ui-components/formlabel";
import { TimePicker } from "@mui/lab";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../../ui-components/toggle-button-group";
import CardLayout from "../../../ui-components/card-layout";
import NoobReachTextEditor from "../../../ui-components/rte";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { helpers } from "brackets-manager";

interface RoundData {
  round: string;
  description: string;
  map: string[];
  name?: string;
  isMap?: boolean;
  startTime?: string;
}
export interface EliminateBracketData {
  name: string;
  startDate: string | null;
  startTime: string | null;
  checkInType: string;
  checkInAmount: number;
  type: string;
  thirdPlace: boolean;
  playersLimit: number | null;
  rounds: RoundData[];
  scoringFormat: string;
  bestOf: number;
}

interface EliminateBracketProps {
  data?: EliminateBracketData;
  onSave?: (data: EliminateBracketData) => void;
}

const EliminateBracket = React.forwardRef<
  EliminateBracketRef,
  EliminateBracketProps
>(({ onSave, data }, ref) => {
  const validationSchema = yup.object({
    checkInType: yup.string().required(),
    type: yup.string().required("type is required"),
    playersLimit: yup.number(),
    bestOf: yup.number(),
    rounds: yup.array().of(
      yup.object().shape({
        round: yup.string().required("Please select round"),
        description: yup.string().required("Please add description"),
        map: yup.array().of(yup.string())
.nullable(),
        startTime: yup.date().when("round", (data) => {
          return data !== "1"
            ? yup.date().required("Start time is required")
            : yup.date();
        }),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      checkInType: data?.checkInType || "false",
      checkInAmount: data?.checkInAmount || 0,
      type: data?.type || "",
      thirdPlace: data?.thirdPlace || false,
      playersLimit: data?.playersLimit || null,
      bestOf: data?.bestOf || 0,
      rounds: data?.rounds || [],
      scoringFormat: data?.scoringFormat || "",
    } as EliminateBracketData,
    validationSchema: validationSchema,
    onSubmit: (values: EliminateBracketData) => {
      if (onSave) {
        onSave({ ...values });
      }
    },
  });
  const [rounds, setRounds] = useState([1]);
  React.useEffect(() => {
    if (data) {
      formik.setValues(data);
    }
  }, [data]);

  React;
  React.useImperativeHandle(ref, () => {
    return {
      // eslint-disable-next-line
      getFormik: (): any => {
        return formik;
      },
    };
  });

  const changeHandler = (
    property: string,
    value: string | boolean | Date | null
  ): void => {
    formik.setFieldValue(property, value, true);
  };

  React.useEffect(() => {
    const rounds: any[] = [];

    if (formik.values.playersLimit && formik.values.playersLimit > 0) {
      const lcount = helpers.getLowerBracketRoundCount(
        formik.values.playersLimit
      );
      const ucount = helpers.getUpperBracketRoundCount(
        formik.values.playersLimit
      );

      for (let i = 0; i < ucount; i++) {
        const isFinal = i === ucount - 1;
        rounds.push({
          name:
            formik.values.type === "SINGLE"
              ? isFinal
                ? "Final Round"
                : `Round ${i + 1}`
              : isFinal
              ? "UB Final Round"
              : `UB Round ${i + 1}`,
        });
      }

      if (formik.values.type === "SINGLE" && formik.values.thirdPlace) {
        rounds.push({
          name: "3rd Place Playoff",
        });
      }

      if (formik.values.type !== "SINGLE") {
        for (let i = 0; i < lcount; i++) {
          const isFinal = i === lcount - 1;
          rounds.push({
            name: isFinal ? "LB Final Round" : `LB Round ${i + 1}`,
          });
        }

        rounds.push({
          name: `GF Round`,
        });
      }
    }

    if (!rounds?.length) rounds.push({ name: "Round 1" });

    formik.values.rounds = formik.values.rounds.slice(0, rounds.length);

    setRounds(rounds);
    rounds.forEach((x, i) => {
      formik.values.rounds[i] = {
        round: `${i + 1}`,
        name: x.name,
        description: formik.values.rounds[i]?.description || "",
        isMap: formik.values.rounds[i]?.isMap || false,
        map: formik.values.rounds[i]?.map || "",
        startTime:
          i === 0
            ? ""
            : formik.values.rounds[i]?.startTime
            ? formik.values.rounds[i]?.startTime
            : new Date().toISOString(),
      };
    });
  }, [formik.values.playersLimit, formik.values.type, formik.values.thirdPlace]);

  return (
    <React.Fragment>
      <CardLayout title="Eliminate Bracket">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormHelperText> Match Check in </FormHelperText>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.checkInType}
                onChange={(
                  e: React.MouseEvent<Element, MouseEvent>,
                  val: string
                ): void => changeHandler("checkInType", val)}
                fullWidth
              >
                <NoobToggleButton value="false">Off</NoobToggleButton>
                <NoobToggleButton value="true">On</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            justifyContent={"space-between"}
            display={"flex"}
            alignItems="center"
          >
            {formik.values.checkInType === "true" ? (
              <React.Fragment>
                <FormControlLabel
                  value={true}
                  label="Check in Timer"
                  control={<Checkbox />}
                />

                <OutlinedInput
                  id="checkInAmount"
                  placeholder="Minutes"
                  onChange={(
                    val: React.ChangeEvent<
                      HTMLTextAreaElement | HTMLInputElement
                    >
                  ): void => changeHandler("checkInAmount", val.target.value)}
                  value={formik.values.checkInAmount}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.checkInAmount &&
                    Boolean(formik.errors.checkInAmount)
                  }
                />
                {formik.touched.checkInAmount &&
                Boolean(formik.errors.checkInAmount) ? (
                  <FormHelperText>{formik.errors.checkInAmount}</FormHelperText>
                ) : null}
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Bracket Style" />
              <RadioGroup
                value={formik.values.type}
                onChange={(event): void =>
                  changeHandler("type", event.target.value)
                }
              >
                <FormControlLabel
                  value="SINGLE"
                  control={<Radio />}
                  label="Single Elimination"
                />
                {formik.values.type === "SINGLE" ? (
                  <FormControlLabel
                    style={{ paddingLeft: "2rem" }}
                    control={
                      <Checkbox
                        checked={formik.values.thirdPlace}
                        disabled={formik.values.playersLimit === 2}
                        onChange={(e): void => {
                          changeHandler(
                            "thirdPlace",
                            !formik.values.thirdPlace
                          );
                        }}
                      />
                    }
                    label="Enable Third Place Match"
                  />
                ) : null}
                <FormControlLabel
                  value="DOUBLE"
                  control={<Radio />}
                  label="Double Elimination"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Bracket Size(# of Players)"></FormLabel>
              <Select
                value={formik.values.playersLimit}
                onChange={(event: any): void => {
                  if (event.target.value === 2)
                    changeHandler("thirdPlace", false);
                  changeHandler("playersLimit", event.target.value);
                }}
                fullWidth
                sx={{ m: 1 }}
              >
                <MenuItem key={2} value={2}>
                  2
                </MenuItem>
                <MenuItem key={4} value={4}>
                  4
                </MenuItem>
                <MenuItem key={8} value={8}>
                  8
                </MenuItem>
                <MenuItem key={16} value={16}>
                  16
                </MenuItem>
                <MenuItem key={32} value={32}>
                  32
                </MenuItem>
                <MenuItem key={64} value={64}>
                  64
                </MenuItem>
                <MenuItem key={128} value={128}>
                  128
                </MenuItem>
                <MenuItem key={256} value={256}>
                  256
                </MenuItem>
              </Select>
              {formik.touched.playersLimit &&
              Boolean(formik.errors.playersLimit) ? (
                <FormHelperText>{formik.errors.playersLimit}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Scoring Format" />
              <OutlinedInput
                id="scoringFormat"
                placeholder="Best Of"
                disabled
                value={formik.values.scoringFormat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Best of For All Round" />
              <TextField
                type="number"
                value={formik.values.bestOf}
                onChange={(event): void =>
                  changeHandler("bestOf", event.target.value)
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormLabel label="Rounds" />
          </Grid>
          <FormikProvider value={formik}>
            <FieldArray
              name="rounds"
              render={(): JSX.Element => {
                const renderRound = (rounds || []).map((round, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid item sm={12}>
                        <FormHelperText>
                          {formik.values?.rounds[index]?.name}
                        </FormHelperText>
                      </Grid>
                      <Grid item sm={12}>
                        <NoobReachTextEditor
                          value={formik.values?.rounds[index]?.description}
                          name={`rounds.${index}.description`}
                          onChange={(value): void => {
                            formik.setFieldValue(
                              `rounds.${index}.description`,
                              value
                            );
                          }}
                          error={
                            formik.touched.rounds &&
                            formik.touched.rounds[index] &&
                            formik.touched.rounds[index].description &&
                            formik.errors.rounds !== undefined &&
                            formik.errors.rounds[index] !== undefined &&
                            Boolean(
                              (formik.errors.rounds[index] as RoundData)
                                .description
                            )
                          }
                        />
                        {formik.touched.rounds &&
                        formik.touched.rounds[index] &&
                        formik.touched.rounds[index].description &&
                        formik.errors.rounds !== undefined &&
                        formik.errors.rounds[index] !== undefined &&
                        Boolean(
                          (formik.errors.rounds[index] as RoundData).description
                        ) ? (
                          <FormHelperText>
                            {
                              (formik.errors.rounds[index] as RoundData)
                                .description
                            }
                          </FormHelperText>
                        ) : null}
                      </Grid>
                      {index !== 0 && (
                        <Grid item sm={4} mt={1}>
                          <FormControl variant="standard">
                            <TimePicker
                              label="Start Time"
                              inputFormat="HH:mm a"
                              onChange={(
                                date: React.SyntheticEvent<
                                  Element,
                                  Event
                                > | null
                              ): void => {
                                formik.setFieldValue(
                                  `rounds.${index}.startTime`,
                                  date
                                );
                              }}
                              value={
                                (formik.values.rounds[index] as RoundData)
                                  ?.startTime
                              }
                              renderInput={(params): JSX.Element => (
                                <TextField
                                  id="startTime"
                                  error={
                                    formik.touched.startTime &&
                                    Boolean(
                                      formik.errors.rounds &&
                                        (
                                          formik.values.rounds[
                                            index
                                          ] as RoundData
                                        )?.startTime
                                    )
                                  }
                                  {...params}
                                />
                              )}
                            />
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item sm={12}>
                        <FormControlLabel
                          label="Map Required"
                          control={
                            <Checkbox
                              checked={formik.values?.rounds[index]?.isMap}
                            />
                          }
                          onChange={(
                            event: React.SyntheticEvent<Element, Event>,
                            checked: boolean
                          ): void => {
                            formik.setFieldValue(
                              `rounds.${index}.isMap`,
                              checked
                            );
                          }}
                        />
                      </Grid>
                      <Grid item sm={12}>
                        {formik.values?.rounds[index]?.isMap &&
                          new Array(5).fill(5)
.map((x, i) => (
                            <OutlinedInput
                              id="map"
                              key={x}
                              placeholder={`Map ${i + 1}`}
                              onChange={(
                                val: React.ChangeEvent<
                                  HTMLTextAreaElement | HTMLInputElement
                                >
                              ): void => {
                                formik.setFieldValue(
                                  `rounds.${index}.map.${i}`,
                                  val.target.value
                                );
                              }}
                              value={formik.values?.rounds[index]?.map[i]}
                              onBlur={formik.handleBlur}
                            />
                          ))}
                      </Grid>
                    </React.Fragment>
                  );
                });
                return <React.Fragment>{renderRound}</React.Fragment>;
              }}
            />
          </FormikProvider>
        </Grid>
      </CardLayout>
    </React.Fragment>
  );
});

export interface EliminateBracketRef {
  // eslint-disable-next-line
  getFormik: () => any;
}
EliminateBracket.displayName = "EliminateBracket";

export default EliminateBracket;
