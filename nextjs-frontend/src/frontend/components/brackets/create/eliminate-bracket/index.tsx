import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { FieldArray, FormikProvider, useFormik } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "../../../ui-components/formlabel";
import { DatePicker, TimePicker } from "@mui/lab";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../../ui-components/toggle-button-group";
import CardLayout from "../../../ui-components/card-layout";
import NoobReachTextEditor from "../../../ui-components/rte";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Duel = require("tournament/duel");
interface RoundData {
  round: string;
  description: string;
  map: string;
  isMap?: boolean;
  startTime?:string
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
    name: yup.string().required("A name is required"),
    startDate: yup
      .date()
      .required("Start date is required")
      .nullable()
      .transform((v) => (v instanceof Date && !isNaN(v.getTime()) ? v : null)),
    startTime: yup
      .date()
      .required("Start time is required")
      .nullable()
      .transform((v) => (v instanceof Date && !isNaN(v.getTime()) ? v : null)),
    checkInType: yup.string().required(),
    type: yup.string().required("type is required"),
    playersLimit: yup.number(),
    rounds: yup.array().of(
      yup.object().shape({
        round: yup.string().required("Please select round"),
        description: yup.string().required("Please add description"),
        map: yup.string(),
        startTime: yup.string()
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      startDate: data?.startDate || null,
      startTime: data?.startTime || null,
      checkInType: data?.checkInType || "false",
      checkInAmount: data?.checkInAmount || 0,
      type: data?.type || "",
      thirdPlace: data?.thirdPlace || false,
      playersLimit: data?.playersLimit || null,
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
      const brackets = new Duel(
        Number(formik.values.playersLimit),
        formik.values.type === "SINGLE" ? 1 : 2
      );
      brackets.matches = brackets.matches.map((element: any) => {
        if (!rounds.includes(element.id.r)) {
          rounds.push(element.id.r);
        }
        return element;
      });
    }
    if (!rounds?.length) rounds.push(1);
    setRounds(rounds);
    formik.values.rounds = formik.values.rounds.slice(0, rounds.length);
    rounds.forEach((x, i) => {
      formik.values.rounds[i] = {
        round: `${i + 1}`,
        description: formik.values.rounds[i]?.description || "",
        isMap: formik.values.rounds[i]?.isMap || false,
        map: formik.values.rounds[i]?.map || "",
        startTime: formik.values.rounds[i]?.startTime
      };
    });
  }, [formik.values.playersLimit]);

  return (
    <React.Fragment>
      <CardLayout title="Eliminate Bracket">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <OutlinedInput
                id="name"
                placeholder="Bracket Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
              {formik.touched.name && Boolean(formik.errors.name) ? (
                <FormHelperText> {formik.errors.name} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Start Date(DD/MM/YYYY)"></FormLabel>
              <DatePicker
                onChange={(value): void => changeHandler("startDate", value)}
                value={formik.values.startDate}
                renderInput={(params): JSX.Element => (
                  <TextField
                    id="startDate"
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    onBlur={formik.handleBlur}
                    {...params}
                  />
                )}
              />
              {formik.touched.startDate && Boolean(formik.errors.startDate) ? (
                <FormHelperText> {formik.errors.startDate} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Start Time"></FormLabel>
              <TimePicker
                inputFormat="HH:mm a"
                onChange={(value): void => changeHandler("startTime", value)}
                value={formik.values.startTime}
                renderInput={(params): JSX.Element => (
                  <TextField
                    id="startTime"
                    error={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                    onBlur={formik.handleBlur}
                    {...params}
                  />
                )}
              />
              {formik.touched.startTime && Boolean(formik.errors.startTime) ? (
                <FormHelperText> {formik.errors.startTime} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
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
                        onChange={(event): void =>
                          changeHandler(
                            "thirdPlace",
                            event.target.value === "on"
                          )
                        }
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
              <TextField
                type="number"
                value={formik.values.playersLimit}
                onChange={(event): void =>
                  changeHandler("playersLimit", event.target.value)
                }
              />
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
              <TextField type="number" />
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
                        <FormHelperText> Round {index + 1} </FormHelperText>
                      </Grid>
                      <Grid item sm={12}>
                        <NoobReachTextEditor
                          id={`rounds.${index}.description`}
                          name={`rounds.${index}.description`}
                          // value={round.description}
                          onChange={(value): void => {
                            // const rteContent = JSON.stringify(
                            //   convertToRaw(value.getCurrentContent())
                            // );
                            formik.setFieldValue(
                              `rounds.${index}.description`,
                              value.getCurrentContent().getPlainText()
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
                        <Grid item sm={4}>
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
                              value={formik.values.rounds[index].startTime}
                              renderInput={(params): JSX.Element => (
                                <TextField
                                  id="startTime"
                                  error={
                                    formik.touched.startTime &&
                                    Boolean(formik.errors.startTime)
                                  }
                                  {...params}
                                />
                              )}
                            />
                            {formik.touched.startTime &&
                            Boolean(formik.errors.startTime) ? (
                              <FormHelperText>
                                {formik.errors.startTime}{" "}
                              </FormHelperText>
                            ) : null}
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item sm={6}>
                        <React.Fragment>
                          <FormControlLabel
                            value={true}
                            label="Map Required"
                            control={<Checkbox />}
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
                          {formik.values?.rounds[index]?.isMap && (
                            <OutlinedInput
                              id="map"
                              placeholder="Map name"
                              onChange={(
                                val: React.ChangeEvent<
                                  HTMLTextAreaElement | HTMLInputElement
                                >
                              ): void => {
                                formik.setFieldValue(
                                  `rounds.${index}.map`,
                                  val.target.value
                                );
                              }}
                              value={formik.values?.rounds[index]?.map}
                              onBlur={formik.handleBlur}
                            />
                          )}
                        </React.Fragment>
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
