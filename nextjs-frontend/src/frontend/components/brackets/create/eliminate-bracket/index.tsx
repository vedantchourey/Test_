import React from "react";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikProvider,
  useFormik,
} from "formik";
import {
  Button,
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
import { EditorState } from "draft-js";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "../../../ui-components/formlabel";
import { DatePicker, TimePicker } from "@mui/lab";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../../ui-components/toggle-button-group";
import CardLayout from "../../../ui-components/card-layout";
import NoobReachTextEditor from "../../../ui-components/rte";

interface RoundData {
  round: string;
  description: string;
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
}

interface EliminateBracketProps {
  data?: EliminateBracketData;
  onSave?: (data: EliminateBracketData) => void;
}

const EliminateBracket = React.forwardRef<
  EliminateBracketRef,
  EliminateBracketProps
>(({ onSave, data }, ref) => {
  const [round, setRound] = React.useState<string>("");
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
    checkInAmount: yup.number().when("checkInType", {
      is: "true",
      then: yup.number().required("Minutes are required"),
    }),
    type: yup.string().required("type is required"),
    thirdPlace: yup.boolean().when("type", {
      is: "SINGLE",
      then: yup.boolean().required("Third Place is required"),
    }),
    playersLimit: yup.number(),
    rounds: yup.array().of(
      yup.object().shape({
        round: yup.string().required("Please select round"),
        description: yup.string().required("Please add description"),
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
      rounds: [],
    } as EliminateBracketData,
    validationSchema: validationSchema,
    onSubmit: (values: EliminateBracketData) => {
      if (onSave) {
        onSave({ ...values });
      }
    },
  });

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

  const addRound = (helper: FieldArrayRenderProps): void => {
    // console.log(round);
    if (round !== "") {
      helper.push({ round: round, description: "" });
      setRound("");
    }
  };
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
                inputFormat="HH:MM a"
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
                id="rounds"
                placeholder="Best Of"
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
              render={(helper): JSX.Element => {
                const renderRound = formik.values.rounds.map((round, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid item sm={12}>
                        <FormHelperText> Round {index + 1} </FormHelperText>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth>
                          <Select
                            value={round.round}
                            displayEmpty
                            defaultValue={""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id={`rounds.${index}.round`}
                            name={`rounds.${index}.round`}
                            error={
                              formik.touched.rounds &&
                              formik.touched.rounds[index] &&
                              formik.touched.rounds[index].round &&
                              formik.errors.rounds !== undefined &&
                              formik.errors.rounds[index] !== undefined &&
                              Boolean(
                                (formik.errors.rounds[index] as RoundData).round
                              )
                            }
                          >
                            <MenuItem value="">Select Round </MenuItem>
                            <MenuItem value="1">Best of 1</MenuItem>
                            <MenuItem value="2">Best of 2</MenuItem>
                          </Select>
                          {formik.touched.rounds &&
                          formik.touched.rounds[index] &&
                          formik.touched.rounds[index].round &&
                          formik.errors.rounds !== undefined &&
                          formik.errors.rounds[index] !== undefined &&
                          Boolean(
                            (formik.errors.rounds[index] as RoundData).round
                          ) ? (
                            <FormHelperText>
                              {(formik.errors.rounds[index] as RoundData).round}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          onClick={(): void => helper.remove(index)}
                          startIcon={
                            <img src="/icons/delete.svg" alt="delete" />
                          }
                        >
                          Remove Details
                        </Button>
                      </Grid>
                      <Grid item sm={12}>
                        <NoobReachTextEditor
                          id={`rounds.${index}.description`}
                          name={`rounds.${index}.description`}
                          onChange={(value: EditorState): void => {
                            formik.setFieldValue(
                              `rounds.${index}.description`,
                              value.getCurrentContent().getPlainText("\u0001")
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
                    </React.Fragment>
                  );
                });

                return (
                  <React.Fragment>
                    {renderRound}
                    <Grid item xs={12}>
                      <FormHelperText>
                        {" "}
                        Round {formik.values.rounds.length + 1}{" "}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          value={round}
                          defaultValue={""}
                          onChange={(e): void => setRound(e.target.value)}
                        >
                          <MenuItem value="">Select Round </MenuItem>
                          <MenuItem value="1">Best of 1</MenuItem>
                          <MenuItem value="2">Best of 2</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        startIcon={<img src="/icons/Plus.svg" alt="add" />}
                        onClick={(): void => addRound(helper)}
                      >
                        Add Details
                      </Button>
                    </Grid>
                  </React.Fragment>
                );
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
