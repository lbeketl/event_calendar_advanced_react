import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import React, { FC, PropsWithChildren, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFromProps {
    guests: IUser[];
    submit: (event: IEvent) =>void
}

const EventForm: FC<EventFromProps> = (
    props: PropsWithChildren<EventFromProps>
) => {
    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: "",
    } as IEvent);

    const { user } = useTypedSelector((state) => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) });
        }
    };

    const submitForm = () => {
        props.submit({...event, author: user.username});
        console.log(event);
    };

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                    onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item
                label="Date of Event"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Сannot add an event in the past')]}
            >
                <DatePicker onChange={(date) => selectDate(date)} />
            </Form.Item>
            <Form.Item
                label="Please choice a guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select
                    defaultValue=""
                    onChange={(guest: string) => setEvent({ ...event, guest })}
                >
                    {props.guests.map((guest) => {
                        return (
                            <Select.Option
                                key={guest.username}
                                value={guest.username}
                            >
                                {guest.username}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Event
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;
